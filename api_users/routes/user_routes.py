from flask import Blueprint, jsonify, request, make_response
from marshmallow import ValidationError
from logger.logger_users import Logger
from flasgger import swag_from

class UserRoutes(Blueprint):
    def __init__(self, user_service, user_schema):
        super().__init__('user', __name__)
        self.user_service = user_service
        self.user_schema = user_schema
        self.register_routes()
        self.logger = Logger()

    def register_routes(self):
        self.route('/api/v1/users', methods=['GET'])(self.get_users)
        self.route("/api/v1/users", methods=["POST"])(self.add_user)
        self.route('/api/v1/users/login', methods=['GET'])(self.get_login_user)
        #self.route("/api/v1/users/like", methods=["GET"])(self.liked_apps)
        #self.route('/api/v1/users/like', methods=['POST'])(self.like_app)
        self.route('/api/v1/users/<int:user_id>', methods=['PUT'])(self.update_user)
        self.route('/api/v1/users/<int:user_id>', methods=['DELETE'])(self.delete_user)
        self.route('/api/v1/users/<int:user_id>', methods=['GET'])(self.get_user_by_id)
        self.route('/healthcheck', methods=['GET'])(self.healthcheck)

    # @swag_from({
    #     'tags': ['Users'],
    #     'parameters': [
    #         {
    #             '_id': 'user_id',
    #         }   
    #     ],
    #     'responses': {
    #         200: {
    #             'description': 'List of liked apps'
    #         },
    #         401: {
    #             'description': 'Invalid user or empty'
    #         },
    #         402: {
    #             'description': 'Validation failed'
    #         },
    #         400: {
    #             'description': 'User does not exist'
    #         },
    #         505: {
    #             'description': 'Internal server error'
    #         }
    #     }
    # })
    # def liked_apps(self):
    #     try:
    #         # let's get the params data
    #         user_id = int(request.args.get('user_id'))
    #         if not user_id:
    #             return jsonify({'error': 'Invalid user or empty'}), 401

    #         try:
    #             self.user_schema.validate_id(str(user_id))
    #         except ValidationError as e:
    #             return jsonify({'error': f'Validation failed: {e}'}), 402
            
    #         user = self.user_service.get_user_by_id(user_id)
    #         if user is None:
    #             return jsonify({'error': 'User does not exist'}), 400
            
    #         liked_apps = self.user_service.get_liked_apps(user_id)
    #         user['likedApps'] = liked_apps

    #         return jsonify(user['likedApps']), 201
    #     except Exception as e:
    #         self.logger.error(f'Error fetching liked apps: {e}')
    #         return jsonify({'error': f'Error fetching liked apps: {e}'}), 505
        
    # @swag_from({
    #     'tags': ['Users'],
    #     'parameters': [
    #         {
    #             'name': 'body',
    #             'in': 'body',
    #             'required': True,
    #             'schema': {
    #                 'type': 'object',
    #                 'properties': {
    #                     'user_id': {'type': 'integer'},
    #                     'app_id': {'type': 'integer'}
    #                 },
    #                 'required': ['user_id', 'app_id']
    #             }
    #         }
    #     ],
    #     'responses': {
    #         200: {
    #             'description': 'App successfully liked'
    #         },
    #         401: {
    #             'description': 'Invalid data, empty'
    #         },
    #         402: {
    #             'description': 'Validation failed'
    #         },
    #         400: {
    #             'description': 'User does not exist'
    #         },
    #         500: {
    #             'description': 'Internal server error'
    #         }
    #     }
    # })
    # def like_app(self):
    #     try:
    #         request_data = request.json
    #         if not request_data:
    #             return jsonify({'error': 'Invalid data, empty'}), 401

    #         user_id = int(request_data.get('user_id'))
    #         app_id = int(request_data.get('app_id'))

    #         try:
    #             self.user_schema.validate_id(str(user_id))
    #         except ValidationError as e:
    #             return jsonify({'error': f'Validation failed: {e}'}), 402

    #         try:
    #             self.user_schema.validate_id(str(app_id))
    #         except ValidationError as e:
    #             return jsonify({'error': f'Validation failed: {e}'}), 403

    #         user = self.user_service.like_app(user_id, app_id)
    #         if user is None:
    #             return jsonify({'error': 'User does not exist'}), 400
            
    #         if isinstance(user, str):
    #             return jsonify({'message': 'Successfully saved app'}), 200

    #         return make_response(user)
    #     except Exception as e:
    #         self.logger.error(f'Error liking app: {e}')
    #         return jsonify({'error': f'Error liking app: {e}'}), 500

    @swag_from({
        'tags': ['Users'],
        'responses': {
            200: {
                'description': 'List of all users'
            },
            500: {
                'description': 'Internal server error'
            }
        }
    })
    def get_users(self):
        try:
            users = self.user_service.get_all_users()
            return jsonify(users), 200
        except Exception as e:
            self.logger.error(f'Error fetching users: {e}')
            return jsonify({'error': f'Error fetching users: {e}'}), 500

    @swag_from({
        'tags': ['Users'],
        'parameters': [
            {
                'name': 'body',
                'in': 'body',
                'required': True,
                'schema': {
                    'type': 'object',
                    'properties': {
                        'email': {'type': 'string'},
                        'password': {'type': 'string'}
                    },
                    'required': ['email', 'password']
                }
            }
        ],
        'responses': {
            200: {
                'description': 'User successfully retrieved'
            },
            400: {
                'description': 'Invalid data or user does not exist'
            },
            500: {
                'description': 'Internal server error'
            }
        }
    })
    def get_login_user(self):
        try:
            email = request.args.get('email')
            password = request.args.get('password')

            if not email or not password:
                return jsonify({'error': 'Invalid data or empty'}), 404

            # Validación de email y contraseña
            try:
                self.user_schema.validate_email(email)
            except ValidationError as e:
                return jsonify({'error': f'Validation failed: {e}'}), 401

            try:
                self.user_schema.validate_password(password)
            except ValidationError as e:
                return jsonify({'error': f'Validation failed: {e}'}), 402

            user_exists = self.user_service.check_user_exists(email)
            if user_exists:
                user = self.user_service.get_user_by_email(email, password)
                if (len(user) > 1):
                    return user
                else:
                    user[1] = ""
                    return jsonify(user), 200
            else:
                return jsonify({'error': 'User does not exist'}), 404
        except Exception as e:
            self.logger.error(f'Error fetching user: {e}')
            return jsonify({'error': f'Error fetching user: {e}'}), 500

    @swag_from({
        'tags': ['Users'],
        'parameters': [
            {
                'name': 'body',
                'in': 'body',
                'required': True,
                'schema': {
                    'type': 'object',
                    'properties': {
                        'email': {'type': 'string'},
                        'password': {'type': 'string'}
                    },
                    'required': ['email', 'password']
                }
            }
        ],
        'responses': {
            201: {
                'description': 'User successfully created'
            },
            400: {
                'description': 'Invalid data or user already exists'
            },
            500: {
                'description': 'Internal server error'
            }
        }
    })
    def add_user(self):
        try:
            request_data = request.json
            if not request_data:
                return jsonify({'error': 'Invalid data, empty'}), 401

            email = request_data.get('email')
            password = request_data.get('password')

            try:
                self.user_schema.validate_email(email)
                self.user_schema.validate_password(password)
            except ValidationError as e:
                return jsonify({'error': f'Validation failed: {e}'}), 402

            user_exists = self.user_service.check_user_exists(email)
            if user_exists:
                return jsonify({'error': 'User already exists'}), 403

            new_user = {
                'email': email,
                'password': password
            }
            created_user = self.user_service.add_user(new_user)
            self.logger.info(f'User created: {created_user}')
            return jsonify(created_user), 201
        except Exception as e:
            self.logger.error(f'Error creating user: {e}')
            return jsonify({'error': f'Error creating user: {e}'}), 501

    @swag_from({
        'tags': ['Users'],
        'parameters': [
            {
                'name': 'user_id',
                'in': 'path',
                'required': True,
                'type': 'integer',
                'description': 'User ID to be updated'
            },
            {
                'name': 'body',
                'in': 'body',
                'required': True,
                'schema': {
                    'type': 'object',
                    'properties': {
                        'email': {'type': 'string'},
                        'password': {'type': 'string'}
                    }
                }
            }
        ],
        'responses': {
            200: {
                'description': 'User successfully updated'
            },
            400: {
                'description': 'Invalid data or user does not exist'
            },
            500: {
                'description': 'Internal server error'
            }
        }
    })
    def update_user(self, user_id):
        try:
            request_data = request.json
            if not request_data:
                return jsonify({'error': 'Invalid data, empty'}), 401

            email = request_data.get('email')
            password = request_data.get('password')

            if email:
                try:
                    self.user_schema.validate_email(email)
                except ValidationError as e:
                    return jsonify({'error': f'Validation failed: {e}'}), 402

            if password:
                try:
                    self.user_schema.validate_password(password)
                except ValidationError as e:
                    return jsonify({'error': f'Validation failed: {e}'}), 403

            updated_user = {k: v for k, v in request_data.items() if v is not None}

            result = self.user_service.update_user(user_id, updated_user)
            if result is None:
                return jsonify({'error': 'User does not exist'}), 400

            if isinstance(result, str):
                return jsonify({'message': result}), 200

            return jsonify({'message': 'User successfully updated', 'user': result}), 200
        except Exception as e:
            self.logger.error(f'Error updating user: {e}')
            return jsonify({'error': f'Error updating user: {e}'}), 500

    @swag_from({
        'tags': ['Users'],
        'parameters': [
            {
                'name': 'user_id',
                'in': 'path',
                'required': True,
                'type': 'integer',
                'description': 'User ID to be deleted'
            }
        ],
        'responses': {
            200: {
                'description': 'User successfully deleted'
            },
            400: {
                'description': 'User does not exist'
            },
            500: {
                'description': 'Internal server error'
            }
        }
    })
    def delete_user(self, user_id):
        try:
            user = self.user_service.delete_user(user_id)
            if user is None:
                return jsonify({'error': 'User does not exist'}), 400

            return jsonify({'message': 'User successfully deleted', 'user': user}), 200
        except Exception as e:
            self.logger.error(f'Error deleting user: {e}')
            return jsonify({'error': f'Error deleting user: {e}'}), 500

    @swag_from({
        'tags': ['Users'],
        'parameters': [
            {
                'name': 'user_id',
                'in': 'path',
                'required': True,
                'type': 'integer',
                'description': 'User ID to retrieve'
            }
        ],
        'responses': {
            200: {
                'description': 'User successfully retrieved'
            },
            400: {
                'description': 'User does not exist'
            },
            500: {
                'description': 'Internal server error'
            }
        }
    })
    def get_user_by_id(self, user_id):
        try:
            user = self.user_service.get_user_by_id(user_id)
            if user is None:
                return jsonify({'error': 'User does not exist'}), 400

            return jsonify(user), 200
        except Exception as e:
            self.logger.error(f'Error fetching user by ID: {e}')
            return jsonify({'error': f'Error fetching user by ID: {e}'}), 500

    def healthcheck(self):
        return jsonify({'status': 'up'}), 200
