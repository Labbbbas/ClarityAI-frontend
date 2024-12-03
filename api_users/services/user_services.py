from flask import jsonify
from logger.logger_users import Logger

class UserService:
    def __init__(self, db_conn):
        self.logger = Logger()
        self.db_conn = db_conn


    def get_all_users(self):
        try:
            users = list(self.db_conn.db.users.find({}, {'password': 0}))  # Exclude passwords
            return users
        except Exception as e:
            self.logger.error(f'Error fetching all users from the database: {e}')
            return jsonify({'error': f'Error fetching all users from the database: {e}'}), 500


    def get_user_by_email(self, email, password):
        try:
            user = list(self.db_conn.db.users.find({'email': email, 'password': password}))
            if len(user) > 0:
                return user[0]
            return (
                jsonify({"error": f"Error fetching the user email from the database"}),
                403,
            )
        except Exception as e:
            self.logger.error(f'Error fetching the user email from the database: {e}')
            return jsonify({'error': f'Error fetching the user email from the database, {e}'}), 505


    def check_user_exists(self, email):
        try:
            # Search for a user with the provided email
            user = self.db_conn.db.users.find_one({'email': email})
            return user is not None
        except Exception as e:
            self.logger.error(f'Error checking if user exists: {e}')
            raise


    def add_user(self, new_user):
        try:
            # Check if the user already exists
            if self.check_user_exists(new_user['email']):
                return jsonify({'error': 'User already exists'}), 400

            # Find the last _id and increment
            last_user = self.db_conn.db.users.find_one(sort=[('_id', -1)])
            next_id = (last_user['_id'] + 1) if last_user else 1
            new_user['_id'] = next_id
            new_user['product_name'] = ""

            # Insert the new user
            self.db_conn.db.users.insert_one(new_user)
            return new_user
        except Exception as e:
            self.logger.error(f'Error creating the new user: {e}')
            return jsonify({'error': f'Error creating the new user: {e}'}), 500


    def get_user_by_id(self, user_id):
        try:
            user = self.db_conn.db.users.find_one({'_id': user_id})  # Exclude passwords
            return user
        except Exception as e:
            self.logger.error(f'Error fetching the user id from the database: {e}')
            return jsonify({'error': f'Error fetching the user id from the database: {e}'}), 500


    def update_user(self, user_id, updated_user):
        try:
            existing_user = self.get_user_by_id(user_id)  # Check if user exists

            if existing_user:
                result = self.db_conn.db.users.update_one({'_id': user_id}, {'$set': updated_user})
                if result.modified_count > 0:
                    return updated_user
                else:
                    return 'The user is already up-to-date'
            else:
                return None
        except Exception as e:
            self.logger.error(f'Error updating the user: {e}')
            return jsonify({'error': f'Error updating the user: {e}'}), 500


    def delete_user(self, user_id):
        try:
            existing_user = self.get_user_by_id(user_id)  # Check if user exists

            if existing_user:
                self.db_conn.db.users.delete_one({'_id': user_id})
                return existing_user
            else:
                return None
        except Exception as e:
            self.logger.error(f'Error deleting the user data: {e}')
            return jsonify({'error': f'Error deleting the user data: {e}'}), 500
    
    def get_all_plans(self):
        try:
            pipe = [{ '$group' : { '_id' : '$product_name', 'totaldocs' : { '$sum' : 1 } } }]
            plans = list(self.db_conn.db.users.aggregate(pipe))  # Exclude passwords
            return plans
        except Exception as e:
            self.logger.error(f'Error fetching all users from the database: {e}')
            return jsonify({'error': f'Error fetching all users from the database: {e}'}), 500


if __name__ == '__main__':
    from models.user_models import UserModel
    
    logger = Logger()
    db_conn = UserModel()
    user_service = UserService(db_conn)
    
    try:
        db_conn.connect_to_database()

        users = user_service.get_all_users()
        if isinstance(users, list):
            logger.info("Users fetched successfully:")
            for user in users:
                print(user)  # Show every user in the console
        else:
            print(users)  # Show an error in case of error

    except Exception as e:
        logger.error(f'An error has occurred: {e}')
    finally:
        db_conn.close_connection()
        logger.info('Connection to database closed')
