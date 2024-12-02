from marshmallow import fields, validates, ValidationError, Schema
import re

class UserSchema(Schema):
    email = fields.String(required=True)
    password = fields.String(required=True)
    # likedApps = fields.List(fields.String(), missing=[]) # those are the _ids from the apps

    @validates('email')
    def validate_email(self, value):
        # Validate email with a regex pattern
        email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_regex, value):
            raise ValidationError('Invalid email address format')
        if len(value) > 254:
            raise ValidationError('Email address is too long')
        
    def validate_id(self, value):
        # Validate the user ID
        if len(value) < 1:
            raise ValidationError('Invalid ID')

    @validates('password')
    def validate_password(self, value):
        # Password must be at least 8 characters long and include
        # at least one uppercase letter, one lowercase letter, and one number
        if len(value) < 8:
            raise ValidationError('Password must be at least 8 characters long')
        if not any(char.isdigit() for char in value):
            raise ValidationError('Password must include at least one number')
        if not any(char.isupper() for char in value):
            raise ValidationError('Password must include at least one uppercase letter')
        if not any(char.islower() for char in value):
            raise ValidationError('Password must include at least one lowercase letter')
        if len(value) > 64:
            raise ValidationError('Password must not exceed 64 characters')
