/*******************************************************************************************************************
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2016 Nicolas DAURES
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

"use strict";

import {Engine} from "src/core/engine";


export class AudioEngine extends Engine
{
	//===================================================================
	// Constructors
	//===================================================================

    /**
     * Create the audio engine.
     */
    constructor ()
    {
        super();

        this.m_aSound =	 [];
    }


    //===================================================================
    // Accessors
    //===================================================================

    /**
     * Get the unique instance of this class.
     * @returns {*}
     */
    static getInstance()
    {
        if(!this.instance)
        {
            this.instance = new AudioEngine();
        }
        return this.instance;
    }


    //===================================================================
    // Operations
    //===================================================================

    /**
     * Update the audio engine.
     */
    update ()
    {

    }

    /**
     * Add the given sound to sound array.
     * @param a_Sound : sound to add.
     */
    addSound (a_Sound)
    {
        this.m_aSound.push(a_Sound);
    }

    /**
     * Play the given sound.
     * @param a_iSound : sound to play.
     */
    playSound (a_iSound)
    {
        this.m_aSound[a_iSound].play();
    }
}

console.debug('AudioEngine loaded');