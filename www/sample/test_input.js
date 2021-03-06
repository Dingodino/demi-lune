/*******************************************************************************************************************
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 Nicolas DAURES
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *******************************************************************************************************************/

import "demilune.js";


/****************************************************************
 * Sample
 ****************************************************************/

var textKey = null;
var textMouseButton = null;
var textMousePosition = null;
var textTouchButton = null;
var textTouchPosition = null;

function initializeTest()
{
	demilune.RenderEngine.setClearColor('#ffffff');
	demilune.RenderEngine.displayFPS(new b2Vec2(240, -230));

	var textKeyPos = new b2Vec2(-300, 200);
	textKey = new demilune.Text2D();
	textKey.setColor("#000000");
	textKey.setFont("22px arial");
	textKey.setText("Key : XXX, State : XXX");
	textKey.getSceneNode().setPosition(textKeyPos);
	demilune.SceneEngine.getRootSceneNode().attachSceneNode(textKey.getSceneNode());
	demilune.RenderEngine.addRenderable(textKey);

	var textMouseButtonPos = new b2Vec2(-300, 100);
	textMouseButton = new demilune.Text2D();
	textMouseButton.setColor("#000000");
	textMouseButton.setFont("22px arial");
	textMouseButton.setText("Mouse : XXX, State : XXX");
	textMouseButton.getSceneNode().setPosition(textMouseButtonPos);
	demilune.SceneEngine.getRootSceneNode().attachSceneNode(textMouseButton.getSceneNode());
	demilune.RenderEngine.addRenderable(textMouseButton);

	var textMousePositionPos = new b2Vec2(-300, 0);
	textMousePosition = new demilune.Text2D();
	textMousePosition.setColor("#000000");
	textMousePosition.setFont("22px arial");
	textMousePosition.setText("Mouse Pos : XXX, XXX");
	textMousePosition.getSceneNode().setPosition(textMousePositionPos);
	demilune.SceneEngine.getRootSceneNode().attachSceneNode(textMousePosition.getSceneNode());
	demilune.RenderEngine.addRenderable(textMousePosition);

	var textTouchButtonPos = new b2Vec2(-300, -100);
	textTouchButton = new demilune.Text2D();
	textTouchButton.setColor("#000000");
	textTouchButton.setFont("22px arial");
	textTouchButton.setText("Touch : XXX, State : XXX");
	textTouchButton.getSceneNode().setPosition(textTouchButtonPos);
	demilune.SceneEngine.getRootSceneNode().attachSceneNode(textTouchButton.getSceneNode());
	demilune.RenderEngine.addRenderable(textTouchButton);

	var textTouchPositionPos = new b2Vec2(-300, -200);
	textTouchPosition = new demilune.Text2D();
	textTouchPosition.setColor("#000000");
	textTouchPosition.setFont("22px arial");
	textTouchPosition.setText("Touch Pos : XXX, XXX");
	textTouchPosition.getSceneNode().setPosition(textTouchPositionPos);
	demilune.SceneEngine.getRootSceneNode().attachSceneNode(textTouchPosition.getSceneNode());
	demilune.RenderEngine.addRenderable(textTouchPosition);
}

function updateTest()
{
	// Get first key pressed
	var keyState = demilune.Keyboard.m_aKeys[0];
	for (var keyIndex = 0; keyIndex < demilune.Keyboard.m_aKeys.length; keyIndex++)
	{
		keyState = demilune.Keyboard.m_aKeys[keyIndex];
		if (keyState != demilune.InputState.NONE)
		{
			break;
		}
	}
	textKey.setText("Key : " + keyIndex + ", State : " + keyState);

	// Get first mouse button pressed
	var mouseState = demilune.Mouse.m_aButtons[0];
	for (var mouseButtonIndex = 0; mouseButtonIndex < demilune.Mouse.m_aButtons.length; mouseButtonIndex++)
	{
		mouseState = demilune.Mouse.m_aButtons[mouseButtonIndex];
		if (mouseState != demilune.InputState.NONE)
		{
			break;
		}
	}
	textMouseButton.setText("Mouse : " + mouseButtonIndex + ", State : " + mouseState);

	// Get the mouse position
	textMousePosition.setText("Mouse Pos : " + demilune.Mouse.m_v2Pos.x + ", " + demilune.Mouse.m_v2Pos.y);

	// Get first touch
	var touchState = demilune.TouchScreen.m_State;
	textTouchButton.setText("Touch State : " + touchState);

	// Get the touch position
	textTouchPosition.setText("Touch Pos : " + demilune.TouchScreen.m_v2Pos.x + ", " + demilune.TouchScreen.m_v2Pos.y);

	demilune.CallbackEngine.subscribePostRenderCallback(updateTest);
}

demilune.CallbackEngine.subscribePostRenderCallback(initializeTest);
demilune.CallbackEngine.subscribePostRenderCallback(updateTest);
