import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Please provide fullname'
          }
        }
      },
      bio: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Please provide email address'
          },
          isEmail: {
            args: true,
            msg: 'Email address is invalid'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isByteLength: {
            args: 8,
            msg: 'Password must be at least 8 characters long'
          }
        }
      }
    },
    {
      hooks: {
        beforeCreate(user) {
          const rawPassword = user.password;
          user.password = bcrypt.hashSync(rawPassword, 10);
        },
        beforeUpdate(user) {
          const rawPassword = user.password;
          user.password = bcrypt.hashSync(rawPassword, 10);
        }
      }
    }
  );
  User.associate = models => {
    User.hasMany(models.Article, { foreignKey: 'userId', as: 'articles' });
  };
  return User;
};
