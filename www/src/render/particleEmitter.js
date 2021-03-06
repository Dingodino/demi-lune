/*******************************************************************************************************************
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2015 Nicolas DAURES
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

import "src/core/constants";
import * as Utils from "src/core/math"; // TODO : polyfill Math
import Color from "src/core/color";
import Particle from "src/render/particle";
import SceneNode from "src/scene/sceneNode";
import RenderEngine from "src/render/renderEngine";
import TimeEngine from "src/core/timeEngine";
import CameraEngine from "src/scene/cameraEngine";


// Particle emitter
export default class ParticleEmitter
{
    //=======================
    // Constructors
    //=======================

    /**
     * Create a particle emitter.
     */
    constructor ()
    {
        this.EParticleEmitterShape =    {POINT:0, DISK:1, RECTANGLE:2};
        this.EParticleShape =           {DISK:0, STROKE_DISK:1, RECTANGLE:2};

        this.m_ParticleSystem =		    null;
        this.m_SceneNode =			    new SceneNode();
        this.m_aParticles =			    new Array();

        this.m_fSpeedMin =			    10;
        this.m_fSpeedMax =			    20;
        this.m_fAngularSpeedMin = 	    0;
        this.m_fAngularSpeedMax =	    0;
        this.m_fLifeMin = 			    3;
        this.m_fLifeMax = 			    5;
        this.m_fScaleMin = 			    10;
        this.m_fScaleMax = 			    20;
        this.m_fScaleEnd = 			    0;
        this.m_fAngleMin = 			    0;
        this.m_fAngleMax = 			    0;
        this.m_fEmitAngle = 			0.2;

        this.m_ColorStart =             new Color(255, 255, 255, 255);
        this.m_ColorEnd =               new Color(0, 0, 0, 0);

        this.m_eEmitShape =             this.EParticleEmitterShape.POINT;
        this.m_fEmitRadius =            10;
        this.m_v2EmitArea =             new b2Vec2(10, 10);

        this.m_eShape =                 this.EParticleShape.DISK;

        this.m_bScaleInTime =			true;
        this.m_bFollowEmitter =			false;

        this.m_fTimeSinceLastPulse =    0;
        this.m_fFrequency =			    0;

        this.m_Blending =				"lighter";

        this.m_bIsLaunched = 			false;
    }


    //=======================
    // Accessors
    //=======================

    /**
     * Get the scene node of the emitter.
     * @returns {*}
     */
    getSceneNode ()
    {
        return this.m_SceneNode;
    }

    /**
     * Get the minimum speed of a particle.
     * @returns {number|*}
     */
    getSpeedMin ()
    {
        return this.m_fSpeedMin;
    }

    /**
     * Set the minimum speed of a particle.
     * @param a_fSpeedMin : new minimum speed.
     */
    setSpeedMin (a_fSpeedMin)
    {
        this.m_fSpeedMin = a_fSpeedMin;
    }

    /**
     * Get the maximum speed of a particle.
     * @returns {number|*}
     */
    getSpeedMax ()
    {
        return this.m_fSpeedMax;
    }

    /**
     * Set the maximum speed of a particle.
     * @param a_fSpeedMax : new maximum speed.
     */
    setSpeedMax (a_fSpeedMax)
    {
        this.m_fSpeedMax = a_fSpeedMax;
    }

    /**
     * Get the minimum angular speed of a particle.
     * @returns {number|*}
     */
    getAngularSpeedMin ()
    {
        return this.m_fAngularSpeedMin;
    }

    /**
     * Set the minimum angular speed of a particle.
     * @param a_fAngularSpeedMin : new minimum angular speed.
     */
    setAngularSpeedMin (a_fAngularSpeedMin)
    {
        this.m_fAngularSpeedMin = a_fAngularSpeedMin;
    }

    /**
     * Get the maximum angular speed of a particle.
     * @returns {number|*}
     */
    getAngularSpeedMax ()
    {
        return this.m_fAngularSpeedMax;
    }

    /**
     * Set the maximum angular speed of a particle.
     * @param a_fAngularSpeedMax : new maximum angular speed.
     */
    setAngularSpeedMax (a_fAngularSpeedMax)
    {
        this.m_fAngularSpeedMax = a_fAngularSpeedMax;
    }

    /**
     * Get the minimum life duration of a particle.
     * @returns {number|*}
     */
    getLifeMin ()
    {
        return this.m_fLifeMin;
    }

    /**
     * Set the minimum life duration of a particle.
     * @param a_fLifeMin : new life duration.
     */
    setLifeMin (a_fLifeMin)
    {
        this.m_fLifeMin = a_fLifeMin;
    }

    /**
     * Get the maximum life duration of a particle.
     * @returns {number|*}
     */
    getLifeMax ()
    {
        return this.m_fLifeMax;
    }

    /**
     * Set the maximum life duration of a particle.
     * @param a_fLifeMax : new life duration.
     */
    setLifeMax (a_fLifeMax)
    {
        this.m_fLifeMax = a_fLifeMax;
    }

    /**
     * Get the minimum angle of a particle.
     * @returns {number|*}
     */
    getAngleMin ()
    {
        return this.m_fAngleMin;
    }

    /**
     * Set the minimum angle of a particle.
     * @param a_fAngleMin : new minimum angle.
     */
    setAngleMin (a_fAngleMin)
    {
        this.m_fAngleMin = a_fAngleMin;
    }

    /**
     * Get the maximum angle of a particle.
     * @returns {number|*}
     */
    getAngleMax ()
    {
        return this.m_fAngleMax;
    }

    /**
     * Set the maximum angle of a particle.
     * @param a_fAngleMax : new maximum angle.
     */
    setAngleMax (a_fAngleMax)
    {
        this.m_fAngleMax = a_fAngleMax;
    }

    /**
     * Get the minimum scale of a particle.
     * @returns {number|*}
     */
    getScaleMin ()
    {
        return this.m_fScaleMin;
    }

    /**
     * Set the minimum scale of a particle.
     * @param a_fScaleMin : new minimum scale.
     */
    setScaleMin (a_fScaleMin)
    {
        this.m_fScaleMin = a_fScaleMin;
    }

    /**
     * Get the maximum scale of a particle.
     * @returns {number|*}
     */
    getScaleMax ()
    {
        return this.m_fScaleMax;
    }

    /**
     * Set the maximum scale of a particle.
     * @param a_fScaleMax : new maximum scale.
     */
    setScaleMax (a_fScaleMax)
    {
        this.m_fScaleMax = a_fScaleMax;
    }

    /**
     * Get the end scale of a particle.
     * @returns {number|*}
     */
    getScaleEnd ()
    {
        return this.m_fScaleEnd;
    }

    /**
     * Set the end scale of a particle.
     * @param a_fScaleEnd : new end scale.
     */
    setScaleEnd (a_fScaleEnd)
    {
        this.m_fScaleEnd = a_fScaleEnd;
    }

    /**
     * Get the shape of a particle.
     * @returns {number|*}
     */
    getShape ()
    {
        return this.m_eShape;
    }

    /**
     * Set the shape of a particle.
     * @param a_eShape : new shape.
     */
    setShape (a_eShape)
    {
        this.m_eShape = a_eShape;
    }

    /**
     * Get the emit angle of a particle.
     * @returns {number|*}
     */
    getEmitAngle ()
    {
        return this.m_fEmitAngle;
    }

    /**
     * Set the emit angle of a particle.
     * @param a_fEmitAngle : new emit angle.
     */
    setEmitAngle (a_fEmitAngle)
    {
        this.m_fEmitAngle = a_fEmitAngle;
    }

    getEmitShape ()
    {
        return this.m_eEmitShape;
    }

    setEmitShape (a_eEmitShape)
    {
        this.m_eEmitShape = a_eEmitShape;
    }

    getEmitRadius ()
    {
        return this.m_fEmitRadius;
    }

    setEmitRadius (a_fEmitRadius)
    {
        this.m_fEmitRadius = a_fEmitRadius;
    }

    getEmitArea ()
    {
        return this.m_v2EmitArea;
    }

    setEmitArea (a_v2EmitArea)
    {
        this.m_v2EmitArea.x = a_v2EmitArea.x;
        this.m_v2EmitArea.y = a_v2EmitArea.y;
    }

    getColorStart ()
    {
        return this.m_ColorStart;
    }

    setColorStart (a_ColorStart)
    {
        this.m_ColorStart = a_ColorStart;
    }

    getColorEnd ()
    {
        return this.m_ColorEnd;
    }

    setColorEnd (a_ColorEnd)
    {
        this.m_ColorEnd = a_ColorEnd;
    }

    isScaleInTime ()
    {
        return this.m_bScaleInTime;
    }

    setScaleInTime (a_bScaleInTime)
    {
        this.m_bScaleInTime = a_bScaleInTime;
    }

    isFollowEmitter ()
    {
        return this.m_bFollowEmitter;
    }

    setFollowEmitter (a_bFollowEmitter)
    {
        this.m_bFollowEmitter = a_bFollowEmitter;
    }

    getFrequency ()
    {
        return this.m_fFrequency;
    }

    setFrequency (a_fFrequency)
    {
        this.m_fFrequency = a_fFrequency;
    }

    getBlending ()
    {
        return this.m_Blending;
    }

    setBlending (a_Blending)
    {
        this.m_Blending = a_Blending;
    }


    //=======================
    // Operations
    //=======================

    /**
     * Update the particle emitter.
     */
    update ()
    {
        var fdt = TimeEngine.getDeltaTime();

        // Remove killed particles
        var particleToRemove = new Array();
        for (var i = 0; i < this.m_aParticles.length; i++)
        {
            var particle = this.m_aParticles[i];
            if (particle.m_fLife < 0)
            {
                particleToRemove.push(particle);
                this.m_ParticleSystem.pushParticle(particle);
            }
        }
        for (var i = 0; i < particleToRemove.length; i++)
        {
            var particle = particleToRemove[i];
            for (var j = 0; j < this.m_aParticles.length; j++)
            {
                if (this.m_aParticles[j] == particle)
                {
                    this.m_aParticles.splice(j, 1);
                }
            }
        }

        // Update particles
        for (var i = 0; i < this.m_aParticles.length; i++)
        {
            var particle = this.m_aParticles[i];
            particle.update(fdt);
        }

        // Draw particles
        this.draw();
    }

    /**
     * Draw the particle emitter.
     */
    draw ()
    {
        var v2CamPos = CameraEngine.m_SceneNode.m_v2Pos;
        var v2Position = new b2Vec2(0, 0);
        var v2Scale = new b2Vec2(0, 0);
        var fOrientation = 0;
        var fRatio = 0;
        var f1mRatio = 0;

        // Draw particles
        if (this.m_ParticleSystem.m_Image != null)
        {
            for (var i = 0; i < this.m_aParticles.length; i++)
            {
                var particle = this.m_aParticles[i];

                var v2Position = new b2Vec2(particle.m_v2Position.x, particle.m_v2Position.y);
                if (this.m_bFollowEmitter)
                {
                    v2Position.x += this.m_SceneNode.m_v2WorldPos.x;
                    v2Position.y += this.m_SceneNode.m_v2WorldPos.y;
                }

                var v2PosInScreen = RenderEngine.convertScenePosToScreenPos(v2Position, v2CamPos);
                v2Scale.x = particle.m_v2Scale.x;
                v2Scale.y = particle.m_v2Scale.y;
                fOrientation = particle.m_fOrientation;

                var context = RenderEngine.context;
                context.save();
                context.globalCompositeOperation = this.m_Blending;
                context.translate(v2PosInScreen.x, v2PosInScreen.y);
                context.rotate(fOrientation);
                context.scale(v2Scale.x, v2Scale.y);
                context.drawImage(this.m_ParticleSystem.m_Image, -0.5, -0.5, 1, 1);
                context.restore();
            }
        }
        else
        {
            for (var i = 0; i < this.m_aParticles.length; i++)
            {
                var particle = this.m_aParticles[i];

                var v2Position = new b2Vec2(particle.m_v2Position.x, particle.m_v2Position.y);
                if (this.m_bFollowEmitter)
                {
                    v2Position.x += this.m_SceneNode.m_v2WorldPos.x;
                    v2Position.y += this.m_SceneNode.m_v2WorldPos.y;
                }

                var v2PosInScreen = RenderEngine.convertScenePosToScreenPos(v2Position, v2CamPos);
                v2Scale.x = particle.m_v2Scale.x;
                v2Scale.y = particle.m_v2Scale.y;
                fOrientation = particle.m_fOrientation;
                fRatio = particle.m_fLife / particle.m_fLifeInit;
                f1mRatio = 1 - fRatio;

                var context = RenderEngine.context;
                context.save();
                context.globalCompositeOperation = this.m_Blending;
                context.translate(v2PosInScreen.x, v2PosInScreen.y);
                context.rotate(fOrientation);
                context.scale(v2Scale.x, v2Scale.y);
                var r = Math.floor(this.m_ColorEnd.r * f1mRatio + this.m_ColorStart.r * fRatio);
                var g = Math.floor(this.m_ColorEnd.g * f1mRatio + this.m_ColorStart.g * fRatio);
                var b = Math.floor(this.m_ColorEnd.b * f1mRatio + this.m_ColorStart.b * fRatio);
                var a = (this.m_ColorEnd.a * f1mRatio + this.m_ColorStart.a * fRatio) / 255;
                switch(this.m_eShape)
                {
                    case this.EParticleShape.DISK:
                        context.beginPath();
                        context.arc(0, 0, 1, 2 * Math.PI, false);
                        context.fillStyle = "rgba(" + r + "," + g + "," + b + "," + a + ")";
                        context.fill();
                        break;

                    case this.EParticleShape.STROKE_DISK:
                        context.beginPath();
                        context.arc(0, 0, 1, 2 * Math.PI, false);
                        context.strokeStyle = "rgba(" + r + "," + g + "," + b + "," + a + ")";
                        context.stroke();
                        break;

                    default:
                        context.fillStyle = "rgba(" + r + "," + g + "," + b + "," + a + ")";
                        context.fillRect(-0.5, -0.5, 1, 1);
                        break;
                }
                context.restore();
            }
        }
    }

    /**
     * Launch the particle emitter.
     */
    launch ()
    {
        this.m_bIsLaunched = true;
    }

    /**
     * Stop the particle emitter.
     */
    stop ()
    {
        this.m_bIsLaunched = false;
    }

    /**
     * Emit particles.
     * @param a_fdt : delta time since last emit.
     */
    emit (a_fdt)
    {
        if (this.m_bIsLaunched)
        {
            this.m_fTimeSinceLastPulse += a_fdt;
            var iParticleCount = Math.floor(this.m_fTimeSinceLastPulse * this.m_fFrequency);
            if (iParticleCount > 0)
            {
                this.pulse(iParticleCount);
                this.m_fTimeSinceLastPulse -= iParticleCount / this.m_fFrequency;
            }
        }
    }

    /**
     * Pulse particles.
     * @param a_iParticleCount : number of particles to pulse.
     */
    pulse (a_iParticleCount)
    {
        for (var i = 0; i < a_iParticleCount; i++)
        {
            var particle = this.m_ParticleSystem.popParticle();
            if (particle == null)
            {
                return;
            }
            this.m_aParticles.push(particle);

            // Initialize position
            var v2EmitterPos = this.m_SceneNode.m_v2Pos;
            switch(this.m_eEmitShape)
            {
                case this.EParticleEmitterShape.DISK:
                    var fLenght = Math.random() * this.m_fEmitRadius;
                    var v2Dir = new b2Vec2(0, 1);
                    v2Dir = Utils.rotateVector(v2Dir, Utils.randomf(0, 2 * Math.PI));
                    if (this.m_bFollowEmitter)
                    {
                        particle.m_v2Position.x = v2Dir.x * fLenght;
                        particle.m_v2Position.y = v2Dir.y * fLenght;
                    }
                    else
                    {
                        particle.m_v2Position.x = v2Dir.x * fLenght + v2EmitterPos.x;
                        particle.m_v2Position.y = v2Dir.y * fLenght + v2EmitterPos.y;
                    }
                    break;
                case this.EParticleEmitterShape.RECTANGLE:
                    var fEmitHalfWidth = this.m_v2EmitArea.x * 0.5;
                    var fEmitHalfHeight = this.m_v2EmitArea.y * 0.5;
                    if (this.m_bFollowEmitter)
                    {
                        particle.m_v2Position.x = Utils.randomf(-fEmitHalfWidth, fEmitHalfWidth);
                        particle.m_v2Position.y = Utils.randomf(-fEmitHalfHeight, fEmitHalfHeight);
                    }
                    else
                    {
                        particle.m_v2Position.x = Utils.randomf(-fEmitHalfWidth, fEmitHalfWidth) + v2EmitterPos.x;
                        particle.m_v2Position.y = Utils.randomf(-fEmitHalfHeight, fEmitHalfHeight) + v2EmitterPos.y;
                    }
                    break;
                default :
                    if (this.m_bFollowEmitter)
                    {
                        particle.m_v2Position.x = 0;
                        particle.m_v2Position.y = 0;
                    }
                    else
                    {
                        particle.m_v2Position.x = v2EmitterPos.x;
                        particle.m_v2Position.y = v2EmitterPos.y;
                    }
                    break;
            }

            // Initialize speed
            var fSpeedInit = Utils.randomf(this.m_fSpeedMin, this.m_fSpeedMax);
            var v2SpeedInit = new b2Vec2(0, 1);
            v2SpeedInit = Utils.rotateVector(v2SpeedInit, this.m_SceneNode.getOrientation());
            if (this.m_fEmitAngle > 0)
            {
                var fEmitHalfAngle = this.m_fEmitAngle * 0.5;
                v2SpeedInit = Utils.rotateVector(v2SpeedInit, Utils.randomf(-fEmitHalfAngle, fEmitHalfAngle));
            }
            particle.m_v2Speed.x = v2SpeedInit.x * fSpeedInit;
            particle.m_v2Speed.y = v2SpeedInit.y * fSpeedInit;

            // Initialize angular speed
            var fAngularSpeed = Utils.randomf(this.m_fAngularSpeedMin, this.m_fAngularSpeedMax);
            particle.m_fAngularSpeed = fAngularSpeed;

            // Initialize scale
            var fScaleInit = Utils.randomf(this.m_fScaleMin, this.m_fScaleMax);
            particle.m_v2ScaleInit.x = fScaleInit;
            particle.m_v2ScaleInit.y = fScaleInit;
            particle.m_v2Scale.x = fScaleInit;
            particle.m_v2Scale.y = fScaleInit;

            // Initialize life
            var fLifeInit = Utils.randomf(this.m_fLifeMin, this.m_fLifeMax);
            particle.m_fLifeInit = fLifeInit;
            particle.m_fLife = fLifeInit;

            // Initialize angle
            var fAngleInit = Utils.randomf(this.m_fAngleMin, this.m_fAngleMax);
            particle.m_fOrientation = fAngleInit;

            particle.m_ParticleEmitter = this;
        }
    }
}

console.debug('ParticleEmitter.js loaded');