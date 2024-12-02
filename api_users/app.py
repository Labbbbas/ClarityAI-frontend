from flask import Flask
from models.user_models import UserModel
from services.user_services import UserService
from schemas.user_schemas import UserSchema
from routes.user_routes import UserRoutes
from flasgger import Swagger
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

swagger = Swagger(app)
db_conn = UserModel()
db_conn.connect_to_database()
user_service = UserService(db_conn)
user_schema = UserSchema()
user_routes = UserRoutes(user_service, user_schema)
app.register_blueprint(user_routes)

if __name__ == '__main__':
    try:
        app.run(port=8000, debug=True)
    finally:
        db_conn.close_connection()
