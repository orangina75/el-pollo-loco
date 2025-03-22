class Health extends MovableObject {
    height = 80;
    width = 80;

    IMAGES_HEALTH = [
        'img/7_statusbars/3_icons/icon_health.png'
    ];

    constructor(x, y) {
        super().loadImage('img/7_statusbars/3_icons/icon_health.png');
        this.loadImages(this.IMAGES_HEALTH);
        this.x = x;
        this.y = y;
    }
}
