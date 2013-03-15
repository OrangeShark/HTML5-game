function InputEngine(canvas) {
    this.bindings = [];
    this.actions = {};
    this.mouse = {
        x: 0,
        y: 0
    };

    var self = this;

    canvas.addEventListener('mousemove', function(event) {
        self.onMouseMove(event);
    });
    canvas.addEventListener('keydown', function(event) {
        self.onKeyDown(event);
    });
    canvas.addEventListener('keyup', function(event) {
        self.onKeyUp(event);
    });

}

InputEngine.prototype.onMouseMove = function(event) {
    this.mouse.x = event.clientX;
    this.mouse.y = event.clientY;
};

InputEngine.prototype.onKeyDown = function(event) {
    var action = this.bindings[event.keyID];

    if(action) {
        this.actions[action] = true;
    }
};

InputEngine.prototype.onKeyUp = function(event) {
    var action = this.bindings[event.keyID];

    if (action) {
        this.actions[action] = false;
    }
};

InputEngine.prototype.bind = function(key, action) {
    this.bindings[key] = action;
};
