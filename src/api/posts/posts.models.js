import { Model } from 'sequelize';

export default (sequelize, dataTypes) => {
    class Post extends Model {};
    
    Post.init({
        title: dataTypes.STRING,
        content: dataTypes.TEXT
    }, { sequelize, modelName: 'post' });

    Post.associate = models => {
        models.post.hasMany(models.tag);
    }

    return Post;
};
