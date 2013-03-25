Vec2 = Box2D.Common.Math.b2Vec2;
BodyDef = Box2D.Dynamics.b2BodyDef;
Body = Box2D.Dynamics.b2Body;
FixtureDef = Box2D.Dynamics.b2FixtureDef;
Fixture = Box2D.Dynamics.b2Fixture;
World = Box2D.Dynamics.b2World;
MassData = Box2D.Collision.Shapes.b2MassData;
PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
CircleShape = Box2D.Collision.Shapes.b2CircleShape;
DebugDraw = Box2D.Dynamics.b2DebugDraw;
RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;

function PhysicsEngine(gravity) {

    if(!gravity) gravity = new Vec2(0, 0);

    this.world = new World(gravity, false);
    this.PHYSICS_LOOP_HZ = 1.0 / 60.0;

}

PhysicsEngine.prototype.update = function() {
    var start = Date.now();

    this.world.Step(this.PHYSICS_LOOP_HZ, 10, 10);
    this.world.ClearForces();

    return (Data.now() - start);
};

PhysicsEngine.prototype.registerBody = function(bodyDef) {
    var body = this.world.CreateBody(bodyDef);
    return body;
};

PhysicsEngine.prototype.addBody = function(entityDef) {
    var bodyDef = new BodyDef();
    var id = entityDef.id;

    if(entityDef.type === "static") {
        bodyDef.type = Body.b2_staticBody;
    }else {
        bodyDef.type = Body.b2_dynamicBody;
    }

    bodyDef.position.Set(entityDef.x, entityDef.y);
    var body = this.registerBody(bodyDef);
    
    var fixDef = new FixtureDef();

    fixDef.shape = new PolygonShape();
    fixDef.shape.SetAsBox(entityDef.halfWidth, entityDef.halfHeight);
    body.createFixture(fixDef);

    return body;
};

PhysicsEngine.prototype.removeBody = function(body) {
    this.world.DestroyBody(body);
};

PhysicsEngine.prototype.addContactListener = function(callbacks) {
    var listener = new Box2D.Dynamics.b2ContactListener();

    if(callbacks.PostSolve) listener.PostSolve = function(contact, impulse) {
        callbacks.PostSolve(contact.GetFixtureA().GetBody(),
                contact.GetFixtureB().GetBody(),
                impulse.normalImpulses[0]);
    };

    this.world.SetContactListener(listener);
};
