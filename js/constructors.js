function Bullet(x,y,speed,width,height,offsetForY){
    this.x = x,
    this.y = y,
    this.speed = speed,
    this.width = width,
    this.height = height,
    this.offsetForY = offsetForY,
    this.animationPermission = true
};

function Enemy(x,y, health, speed, width, height, offsetForY, currentBlock, alienMove, frame, alienAttack, deletePermission){
    this.x = x,
    this.y = y,
    this.health = health,
    this.speed = speed,
    this.width = width,
    this.height = height,
    this.offsetForY = offsetForY,
    this.currentBlock = currentBlock,
    this.alienMove = alienMove,
    this.frame = frame,
    this.alienAttack = alienAttack,
    this.deletePermission = deletePermission
}


