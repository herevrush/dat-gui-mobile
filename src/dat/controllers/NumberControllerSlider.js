/**
 * dat-gui JavaScript Controller Library
 * http://code.google.com/p/dat-gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

define([
        'dat/controllers/NumberController',
        'dat/dom/dom',
        'dat/utils/css',
        'dat/utils/common',
        'text!dat/controllers/NumberControllerSlider.css'
    ],
    function (NumberController, dom, css, common, styleSheet) {

        /**
         * @class Represents a given property of an object that is a number, contains
         * a minimum and maximum, and provides a slider element with which to
         * manipulate it. It should be noted that the slider element is made up of
         * <code>&lt;div&gt;</code> tags, <strong>not</strong> the html5
         * <code>&lt;slider&gt;</code> element.
         *
         * @extends dat.controllers.Controller
         * @extends dat.controllers.NumberController
         *
         * @param {Object} object The object to be manipulated
         * @param {string} property The name of the property to be manipulated
         * @param {Number} minValue Minimum allowed value
         * @param {Number} maxValue Maximum allowed value
         * @param {Number} stepValue Increment by which to change value
         *
         * @member dat.controllers
         */
        var slider_id = 1;
        var NumberControllerSlider = function (object, property, min, max, step) {

            NumberControllerSlider.superclass.call(this, object, property, {min: min, max: max, step: step});

            var _this = this;

            //this.__background = document.createElement('div');
            //this.__foreground = document.createElement('div');
            this.__input = document.createElement('input');
            var slider_name = "slider_" + slider_id;
            this.__input.setAttribute('name', slider_name);
            this.__input.setAttribute('id', slider_name);
            this.__input.setAttribute('type', 'range');
            this.__input.setAttribute('min', min);
            this.__input.setAttribute('max', max);
            //this.__input.setAttribute('data-mini', true);
            if (step != undefined) {
                this.__input.setAttribute('step', step);
            }
            else {
                this.__input.setAttribute('step', 1);
            }
            this.__input.setAttribute('value', _this.initialValue);

            dom.bind(this.__input, 'change', onChange);
            dom.bind(this.__input, 'blur', onBlur);

            function onChange() {
                var attempted = parseFloat(_this.__input.value);
                if (!common.isNaN(attempted)) _this.setValue(attempted);
            }

            function onBlur() {
                onChange();
                if (_this.__onFinishChange) {
                    _this.__onFinishChange.call(_this, _this.getValue());
                }
            }


            //dom.bind(this.__background, 'mousedown', onMouseDown);
            //
            //dom.addClass(this.__background, 'slider');
            //dom.addClass(this.__foreground, 'slider-fg');
            //
            //function onMouseDown(e) {
            //
            //  dom.bind(window, 'mousemove', onMouseDrag);
            //  dom.bind(window, 'mouseup', onMouseUp);
            //
            //  onMouseDrag(e);
            //}
            //
            //function onMouseDrag(e) {
            //
            //  e.preventDefault();
            //
            //  var offset = dom.getOffset(_this.__background);
            //  var width = dom.getWidth(_this.__background);
            //
            //  _this.setValue(
            //  	map(e.clientX, offset.left, offset.left + width, _this.__min, _this.__max)
            //  );
            //
            //  return false;
            //
            //}
            //
            //function onMouseUp() {
            //  dom.unbind(window, 'mousemove', onMouseDrag);
            //  dom.unbind(window, 'mouseup', onMouseUp);
            //  if (_this.__onFinishChange) {
            //    _this.__onFinishChange.call(_this, _this.getValue());
            //  }
            //}

            this.updateDisplay();

            //this.__background.appendChild(this.__foreground);
            //this.domElement.appendChild(this.__background);
            this.domElement.appendChild(this.__input);
            dom.addClass(this.domElement, 'ui-field-contain');

            slider_id++;

        };

        NumberControllerSlider.superclass = NumberController;

        /**
         * Injects default stylesheet for slider elements.
         */
        NumberControllerSlider.useDefaultStyles = function () {
            css.inject(styleSheet);
        };

        common.extend(
            NumberControllerSlider.prototype,
            NumberController.prototype,

            {

                updateDisplay: function () {
                    var pct = (this.getValue() - this.__min) / (this.__max - this.__min);
                    //this.__foreground.style.width = pct * 100 + '%';
                    return NumberControllerSlider.superclass.prototype.updateDisplay.call(this);
                }

            }
        );

        function map(v, i1, i2, o1, o2) {
            return o1 + (o2 - o1) * ((v - i1) / (i2 - i1));
        }

        return NumberControllerSlider;

    });