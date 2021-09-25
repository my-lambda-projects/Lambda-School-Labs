const markers = (sequelize, DataTypes) => {
    const Markers = sequelize.define('markers', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        markerName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        eta: {
            type: DataTypes.DATEONLY,
        },
        time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        lng: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lat: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })

    return Markers;
};



module.exports = markers;