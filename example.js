/**
 * Created by vrushali on 18/11/15.
 */
var obj = {
    x: 5
};
var FizzyText = function () {          /* VarType  |  Display             */
    this.message = 'dat.gui';

    /* string     -> text                 */
    this.speed = 0.8;
    /* numbers -> cursor               */
    this.displayBorder = false;
    /* yes-no    -> checkbox           */
    this.explode = function () {
    };
    /* function  -> click run function */
    this.population = 6;
};

window.onload = function () {
    var text = new FizzyText();
    var gui = new dat.GUI();
    //gui.remember(FizzyText);

    gui.add(text, 'message');
    gui.add(text, 'speed', -5, 5);
    /* +range */
    gui.add(text, 'displayBorder').name('Border');
    /* custom display name */
    gui.add(text, 'explode');
    gui.addFolder('population').add(text, 'population', 0, 20);

};

