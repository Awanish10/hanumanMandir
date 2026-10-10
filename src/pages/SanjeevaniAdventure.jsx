import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Play,
  RotateCcw,
  Pause,
  Volume2,
  VolumeX,
  HelpCircle,
  Trophy,
  Sparkles,
  ArrowLeft,
  X,
  Flame,
  CheckCircle2,
  AlertTriangle,
  Award,
  ChevronRight
} from 'lucide-react';
import './SanjeevaniAdventure.css';

/**
 * Pure Web Audio API Sound Synthesizer
 * Zero external audio files required — 100% offline, resilient, lightweight
 */
class SoundEffects {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  playFlap() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(190, now);
      osc.frequency.exponentialRampToValueAtTime(340, now + 0.12);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.14);
    } catch (e) {
      // Audio playback silently ignored if blocked by browser
    }
  }

  playCollect() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      // Celestial harmonic chord (E5, A5, D6)
      const frequencies = [659.25, 880, 1174.66];
      frequencies.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        const start = now + idx * 0.04;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.18, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.28);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.28);
      });
    } catch (e) {}
  }

  playHit() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(130, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.22);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
    } catch (e) {}
  }

  playVictory() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      // Majestic ascending chime fanfare (C5, E5, G5, C6)
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        const start = now + idx * 0.12;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.22, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.45);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.45);
      });
    } catch (e) {}
  }
}

const soundManager = new SoundEffects();

/**
 * Virtual Canvas Constants
 * Calibrated for optimal responsive physics across all screen aspect ratios
 */
const V_WIDTH = 900;
const V_HEIGHT = 540;
const TARGET_DISTANCE = 2500; // Target distance in meters to reach Sanjeevani mountain
const GRAVITY = 860; // Pixels per second squared
const FLAP_IMPULSE = -330; // Upward impulse on flap
const BASE_SPEED = 190; // Pixels per second forward scroll

export default function SanjeevaniAdventure() {
  // Game state: 'intro' | 'playing' | 'paused' | 'gameover' | 'victory'
  const [gameState, setGameState] = useState('intro');
  const [score, setScore] = useState(0);
  const [herbsCollected, setHerbsCollected] = useState(0);
  const [distance, setDistance] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  // References
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastTimeRef = useRef(0);
  const gameStateRef = useRef(gameState);

  // Keep gameStateRef in sync for the animation loop
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  // Load safe best score & muted preference from localStorage
  useEffect(() => {
    try {
      const savedBest = localStorage.getItem('sanjeevani_best_score');
      if (savedBest) {
        const parsed = parseInt(savedBest, 10);
        if (!isNaN(parsed) && parsed > 0) {
          setBestScore(parsed);
        }
      }
      const savedMute = localStorage.getItem('sanjeevani_muted');
      if (savedMute !== null) {
        const mutedBool = savedMute === 'true';
        setIsMuted(mutedBool);
        soundManager.muted = mutedBool;
      }
    } catch (err) {
      // Ignore localStorage read failures in private mode
    }
  }, []);

  // Toggle sound
  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      soundManager.muted = next;
      try {
        localStorage.setItem('sanjeevani_muted', String(next));
      } catch (e) {}
      return next;
    });
  };

  /**
   * Internal Game World State
   * Kept in refs to avoid React re-render lag during 60 FPS animation
   */
  const worldRef = useRef({
    player: {
      x: 180,
      y: 270,
      vy: 0,
      radius: 20,
      tilt: 0,
      tailOffset: 0
    },
    obstacles: [],
    herbs: [],
    particles: [],
    popups: [],
    clouds: [],
    stars: [],
    scrollX: 0,
    distanceTravelled: 0,
    currentScore: 0,
    herbsCount: 0,
    nextObstacleX: 520,
    lastObstacleGapY: 270
  });

  /**
   * Generate initial background stars and clouds
   */
  const initBackgroundElements = useCallback(() => {
    const stars = [];
    for (let i = 0; i < 40; i++) {
      stars.push({
        x: Math.random() * V_WIDTH,
        y: Math.random() * (V_HEIGHT * 0.45),
        radius: Math.random() * 1.5 + 0.6,
        alpha: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 2 + 1
      });
    }

    const clouds = [];
    for (let i = 0; i < 7; i++) {
      clouds.push({
        x: Math.random() * V_WIDTH,
        y: 40 + Math.random() * 200,
        width: 140 + Math.random() * 120,
        height: 45 + Math.random() * 35,
        speedFactor: 0.4 + Math.random() * 0.3,
        opacity: 0.35 + Math.random() * 0.25
      });
    }

    worldRef.current.stars = stars;
    worldRef.current.clouds = clouds;
  }, []);

  /**
   * Reset game world for a new run
   */
  const resetGameWorld = useCallback(() => {
    initBackgroundElements();
    worldRef.current.player = {
      x: 180,
      y: 270,
      vy: 0,
      radius: 20,
      tilt: 0,
      tailOffset: 0
    };
    worldRef.current.obstacles = [];
    worldRef.current.herbs = [];
    worldRef.current.particles = [];
    worldRef.current.popups = [];
    worldRef.current.scrollX = 0;
    worldRef.current.distanceTravelled = 0;
    worldRef.current.currentScore = 0;
    worldRef.current.herbsCount = 0;
    worldRef.current.nextObstacleX = 550;
    worldRef.current.lastObstacleGapY = 270;

    setScore(0);
    setHerbsCollected(0);
    setDistance(0);
    setIsNewHighScore(false);
  }, [initBackgroundElements]);

  /**
   * Save best score safely
   */
  const handleScoreCompletion = useCallback((finalScore) => {
    setBestScore((prev) => {
      if (finalScore > prev) {
        setIsNewHighScore(true);
        try {
          localStorage.setItem('sanjeevani_best_score', String(finalScore));
        } catch (e) {}
        return finalScore;
      }
      return prev;
    });
  }, []);

  /**
   * Start or restart gameplay
   */
  const startGame = () => {
    soundManager.init();
    resetGameWorld();
    setGameState('playing');
    lastTimeRef.current = performance.now();
  };

  /**
   * Pause gameplay
   */
  const pauseGame = () => {
    if (gameStateRef.current === 'playing') {
      setGameState('paused');
    }
  };

  /**
   * Resume gameplay
   */
  const resumeGame = () => {
    if (gameStateRef.current === 'paused') {
      soundManager.init();
      lastTimeRef.current = performance.now();
      setGameState('playing');
    }
  };

  /**
   * Return to Intro / Home screen
   */
  const returnToGameHome = () => {
    setGameState('intro');
  };

  /**
   * Flap / Fly action (Player input)
   */
  const triggerFlap = useCallback(() => {
    if (gameStateRef.current !== 'playing') {
      if (gameStateRef.current === 'intro') {
        startGame();
      }
      return;
    }

    worldRef.current.player.vy = FLAP_IMPULSE;
    soundManager.playFlap();

    // Spawn tiny golden divine thrust particles behind Hanuman Ji
    const { player, particles } = worldRef.current;
    for (let i = 0; i < 4; i++) {
      particles.push({
        x: player.x - 22,
        y: player.y + (Math.random() * 16 - 8),
        vx: -60 - Math.random() * 40,
        vy: (Math.random() - 0.5) * 40,
        color: '#FCD34D',
        radius: Math.random() * 2.5 + 1.5,
        alpha: 0.9,
        decay: 2.2
      });
    }
  }, []);

  /**
   * Keyboard & mobile event handlers
   */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault(); // Prevent page scrolling
        triggerFlap();
      } else if (e.code === 'Escape' || e.code === 'KeyP') {
        e.preventDefault();
        if (gameStateRef.current === 'playing') {
          pauseGame();
        } else if (gameStateRef.current === 'paused') {
          resumeGame();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Auto-pause if tab is hidden
    const handleVisibilityChange = () => {
      if (document.hidden && gameStateRef.current === 'playing') {
        pauseGame();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [triggerFlap]);

  /**
   * Obstacle and Herb Spawner
   */
  const spawnWorldEntities = (dt, currentSpeed) => {
    const world = worldRef.current;

    // Advance distance
    world.distanceTravelled += currentSpeed * dt * 0.12;
    world.currentScore += currentSpeed * dt * 0.06;

    // Check victory condition
    if (world.distanceTravelled >= TARGET_DISTANCE) {
      soundManager.playVictory();
      const finalScore = Math.floor(world.currentScore);
      setScore(finalScore);
      setHerbsCollected(world.herbsCount);
      setDistance(TARGET_DISTANCE);
      handleScoreCompletion(finalScore);
      setGameState('victory');
      return;
    }

    // Spawn new obstacles as camera scrolls
    if (world.scrollX + V_WIDTH >= world.nextObstacleX && world.distanceTravelled < TARGET_DISTANCE - 150) {
      const obstacleX = world.nextObstacleX;

      // Smooth gap calculation between consecutive obstacles
      const gapHeight = Math.max(185, 210 - (world.distanceTravelled / TARGET_DISTANCE) * 20);
      const minGapY = 120 + gapHeight / 2;
      const maxGapY = V_HEIGHT - 120 - gapHeight / 2;

      // Moderate variance from previous obstacle to keep path fair and smooth
      let targetGapY = world.lastObstacleGapY + (Math.random() * 160 - 80);
      targetGapY = Math.max(minGapY, Math.min(maxGapY, targetGapY));
      world.lastObstacleGapY = targetGapY;

      const gapTop = targetGapY - gapHeight / 2;
      const gapBottom = targetGapY + gapHeight / 2;
      const obstacleWidth = 65;

      // Obstacle type: alternately rocks or storm cloud
      const isThunderCloud = Math.random() < 0.35;

      world.obstacles.push({
        x: obstacleX,
        width: obstacleWidth,
        gapTop,
        gapBottom,
        isThunderCloud,
        passed: false
      });

      // Spawn glowing Sanjeevani Herb
      if (Math.random() < 0.75) {
        world.herbs.push({
          x: obstacleX + (Math.random() < 0.5 ? 0 : 130),
          y: targetGapY + (Math.random() * 60 - 30),
          radius: 16,
          collected: false,
          pulsePhase: Math.random() * Math.PI * 2
        });
      }

      // Next obstacle distance spacing
      world.nextObstacleX += 275 + Math.random() * 50;
    }
  };

  /**
   * Physics Update and Collision Detection
   */
  const updatePhysics = (dt) => {
    const world = worldRef.current;
    const { player } = world;

    // Apply speed scaling
    const speedRatio = Math.min(1, world.distanceTravelled / TARGET_DISTANCE);
    const currentSpeed = BASE_SPEED + speedRatio * 45;

    // Scroll world
    world.scrollX += currentSpeed * dt;

    // Apply gravity to player
    player.vy += GRAVITY * dt;
    // Terminal downward velocity
    player.vy = Math.min(480, player.vy);
    player.y += player.vy * dt;

    // Smooth rotation angle based on vertical velocity
    const targetTilt = Math.max(-0.4, Math.min(0.48, player.vy * 0.0016));
    player.tilt += (targetTilt - player.tilt) * 0.2;

    // Top ceiling boundary
    if (player.y - player.radius < 10) {
      player.y = 10 + player.radius;
      player.vy = 0;
    }

    // Floor crash check
    if (player.y + player.radius >= V_HEIGHT - 12) {
      soundManager.playHit();
      const finalScore = Math.floor(world.currentScore);
      setScore(finalScore);
      setHerbsCollected(world.herbsCount);
      setDistance(Math.floor(world.distanceTravelled));
      handleScoreCompletion(finalScore);
      setGameState('gameover');
      return;
    }

    // Spawn obstacles and herbs
    spawnWorldEntities(dt, currentSpeed);

    // Filter off-screen obstacles and check collisions
    const activeObstacles = [];
    for (let i = 0; i < world.obstacles.length; i++) {
      const obs = world.obstacles[i];
      const screenX = obs.x - world.scrollX;

      // Collision detection with 70% inner hitbox for fair gameplay
      const hitMargin = 12;
      const inXRange = player.x + player.radius - hitMargin > screenX &&
                       player.x - player.radius + hitMargin < screenX + obs.width;

      if (inXRange) {
        if (obs.isThunderCloud) {
          // Thundercloud top and bottom obstacles
          if (player.y - player.radius + hitMargin < obs.gapTop ||
              player.y + player.radius - hitMargin > obs.gapBottom) {
            soundManager.playHit();
            const finalScore = Math.floor(world.currentScore);
            setScore(finalScore);
            setHerbsCollected(world.herbsCount);
            setDistance(Math.floor(world.distanceTravelled));
            handleScoreCompletion(finalScore);
            setGameState('gameover');
            return;
          }
        } else {
          // Himalayan mountain peaks
          if (player.y - player.radius + hitMargin < obs.gapTop ||
              player.y + player.radius - hitMargin > obs.gapBottom) {
            soundManager.playHit();
            const finalScore = Math.floor(world.currentScore);
            setScore(finalScore);
            setHerbsCollected(world.herbsCount);
            setDistance(Math.floor(world.distanceTravelled));
            handleScoreCompletion(finalScore);
            setGameState('gameover');
            return;
          }
        }
      }

      // Check if player passed obstacle safely for bonus points
      if (!obs.passed && screenX + obs.width < player.x) {
        obs.passed = true;
        world.currentScore += 30;
      }

      // Keep obstacle if still visible
      if (screenX + obs.width > -100) {
        activeObstacles.push(obs);
      }
    }
    world.obstacles = activeObstacles;

    // Herb collection check
    const activeHerbs = [];
    for (let i = 0; i < world.herbs.length; i++) {
      const herb = world.herbs[i];
      const screenX = herb.x - world.scrollX;

      if (!herb.collected) {
        const dx = player.x - screenX;
        const dy = player.y - herb.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Herb collection radius
        if (dist < player.radius + herb.radius + 6) {
          herb.collected = true;
          world.currentScore += 100;
          world.herbsCount += 1;
          soundManager.playCollect();

          // Spawn floating score popup
          world.popups.push({
            x: screenX,
            y: herb.y,
            text: '+100 🌿',
            alpha: 1,
            vy: -45
          });

          // Spawn golden radiant sparkles
          for (let p = 0; p < 14; p++) {
            const angle = Math.random() * Math.PI * 2;
            const spd = 50 + Math.random() * 80;
            world.particles.push({
              x: screenX,
              y: herb.y,
              vx: Math.cos(angle) * spd,
              vy: Math.sin(angle) * spd,
              color: Math.random() < 0.6 ? '#34D399' : '#FCD34D',
              radius: Math.random() * 3 + 2,
              alpha: 1,
              decay: 1.8
            });
          }
        }
      }

      if (!herb.collected && screenX + herb.radius > -50) {
        activeHerbs.push(herb);
      }
    }
    world.herbs = activeHerbs;

    // Update particles
    const activeParticles = [];
    for (let i = 0; i < world.particles.length; i++) {
      const p = world.particles[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.alpha -= p.decay * dt;
      if (p.alpha > 0) {
        activeParticles.push(p);
      }
    }
    world.particles = activeParticles;

    // Update popups
    const activePopups = [];
    for (let i = 0; i < world.popups.length; i++) {
      const pop = world.popups[i];
      pop.y += pop.vy * dt;
      pop.alpha -= 0.9 * dt;
      if (pop.alpha > 0) {
        activePopups.push(pop);
      }
    }
    world.popups = activePopups;

    // Sync HUD states throttled to once every few frames
    setScore(Math.floor(world.currentScore));
    setHerbsCollected(world.herbsCount);
    setDistance(Math.min(TARGET_DISTANCE, Math.floor(world.distanceTravelled)));
  };

  /**
   * Canvas Drawing Routine
   */
  const renderCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Scale canvas context to match Virtual dimensions
    const scaleX = canvas.width / V_WIDTH;
    const scaleY = canvas.height / V_HEIGHT;

    ctx.save();
    ctx.scale(scaleX, scaleY);

    const world = worldRef.current;
    const { player, scrollX, distanceTravelled } = world;

    // 1. SKY GRADIENT: Dawn over the Himalayas
    const skyGrad = ctx.createLinearGradient(0, 0, 0, V_HEIGHT);
    skyGrad.addColorStop(0, '#0F172A'); // Deep twilight indigo
    skyGrad.addColorStop(0.35, '#1E293B'); // Night blue
    skyGrad.addColorStop(0.68, '#831843'); // Dawn crimson rose
    skyGrad.addColorStop(0.88, '#C2410C'); // Saffron dawn
    skyGrad.addColorStop(1, '#FBBF24'); // Golden morning sun horizon
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, V_WIDTH, V_HEIGHT);

    // 2. STARS (twinkling in upper atmosphere)
    world.stars.forEach((star) => {
      const twinkle = Math.sin(performance.now() * 0.003 * star.twinkleSpeed) * 0.3 + 0.7;
      ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha * twinkle})`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    // 3. MORNING SUN HORIZON GLOW
    const sunX = V_WIDTH * 0.82;
    const sunY = V_HEIGHT * 0.82;
    const sunGlow = ctx.createRadialGradient(sunX, sunY, 15, sunX, sunY, 140);
    sunGlow.addColorStop(0, 'rgba(254, 240, 138, 0.95)');
    sunGlow.addColorStop(0.4, 'rgba(251, 191, 36, 0.5)');
    sunGlow.addColorStop(1, 'rgba(245, 158, 11, 0)');
    ctx.fillStyle = sunGlow;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 140, 0, Math.PI * 2);
    ctx.fill();

    // 4. PARALLAX LAYER 1: Distant Snow-Capped Himalayan Summits
    ctx.save();
    const farScroll = (scrollX * 0.12) % V_WIDTH;
    ctx.translate(-farScroll, 0);
    for (let r = 0; r < 2; r++) {
      const offsetX = r * V_WIDTH;
      ctx.fillStyle = '#1E1B4B'; // Indigo mountain base
      ctx.beginPath();
      ctx.moveTo(offsetX, V_HEIGHT);
      ctx.lineTo(offsetX, 340);
      ctx.lineTo(offsetX + 120, 220);
      ctx.lineTo(offsetX + 250, 310);
      ctx.lineTo(offsetX + 380, 180);
      ctx.lineTo(offsetX + 520, 290);
      ctx.lineTo(offsetX + 680, 190);
      ctx.lineTo(offsetX + 810, 270);
      ctx.lineTo(offsetX + V_WIDTH, 330);
      ctx.lineTo(offsetX + V_WIDTH, V_HEIGHT);
      ctx.closePath();
      ctx.fill();

      // Snow crest on majestic summits
      ctx.fillStyle = '#E0E7FF';
      ctx.beginPath();
      // Peak 1
      ctx.moveTo(offsetX + 120, 220);
      ctx.lineTo(offsetX + 90, 255);
      ctx.lineTo(offsetX + 150, 255);
      ctx.closePath();
      // Peak 2
      ctx.moveTo(offsetX + 380, 180);
      ctx.lineTo(offsetX + 340, 230);
      ctx.lineTo(offsetX + 420, 230);
      ctx.closePath();
      // Peak 3
      ctx.moveTo(offsetX + 680, 190);
      ctx.lineTo(offsetX + 645, 235);
      ctx.lineTo(offsetX + 715, 235);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();

    // 5. PARALLAX LAYER 2: Mid-ground Himalayan Forest Ridges
    ctx.save();
    const midScroll = (scrollX * 0.32) % V_WIDTH;
    ctx.translate(-midScroll, 0);
    for (let r = 0; r < 2; r++) {
      const offsetX = r * V_WIDTH;
      ctx.fillStyle = '#311432'; // Deep purple-earth tone
      ctx.beginPath();
      ctx.moveTo(offsetX, V_HEIGHT);
      ctx.lineTo(offsetX, 410);
      ctx.lineTo(offsetX + 150, 320);
      ctx.lineTo(offsetX + 300, 390);
      ctx.lineTo(offsetX + 460, 305);
      ctx.lineTo(offsetX + 620, 400);
      ctx.lineTo(offsetX + 770, 315);
      ctx.lineTo(offsetX + V_WIDTH, 420);
      ctx.lineTo(offsetX + V_WIDTH, V_HEIGHT);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();

    // 6. FLOATING CLOUDS
    world.clouds.forEach((cloud) => {
      const cloudScreenX = ((cloud.x - scrollX * cloud.speedFactor) % (V_WIDTH + 200)) - 100;
      ctx.fillStyle = `rgba(255, 255, 255, ${cloud.opacity})`;
      ctx.beginPath();
      ctx.ellipse(cloudScreenX, cloud.y, cloud.width * 0.5, cloud.height * 0.5, 0, 0, Math.PI * 2);
      ctx.ellipse(cloudScreenX + 30, cloud.y - 12, cloud.width * 0.35, cloud.height * 0.45, 0, 0, Math.PI * 2);
      ctx.ellipse(cloudScreenX - 30, cloud.y - 8, cloud.width * 0.3, cloud.height * 0.4, 0, 0, Math.PI * 2);
      ctx.fill();
    });

    // 7. SACRED SANJEEVANI MOUNTAIN (DRONAGIRI) APPROACHING AT DESTINATION
    if (distanceTravelled >= TARGET_DISTANCE * 0.72) {
      const approachProgress = (distanceTravelled - TARGET_DISTANCE * 0.72) / (TARGET_DISTANCE * 0.28);
      const dronagiriX = V_WIDTH - approachProgress * 360;

      ctx.save();
      // Radiant emerald-golden aura of Dronagiri
      const dronagiriGlow = ctx.createRadialGradient(dronagiriX + 160, 280, 40, dronagiriX + 160, 280, 280);
      dronagiriGlow.addColorStop(0, 'rgba(52, 211, 153, 0.85)');
      dronagiriGlow.addColorStop(0.5, 'rgba(251, 191, 36, 0.45)');
      dronagiriGlow.addColorStop(1, 'rgba(16, 185, 129, 0)');
      ctx.fillStyle = dronagiriGlow;
      ctx.beginPath();
      ctx.arc(dronagiriX + 160, 280, 280, 0, Math.PI * 2);
      ctx.fill();

      // Mountain Body
      ctx.fillStyle = '#2A170F';
      ctx.beginPath();
      ctx.moveTo(dronagiriX - 60, V_HEIGHT);
      ctx.lineTo(dronagiriX + 160, 130);
      ctx.lineTo(dronagiriX + 380, V_HEIGHT);
      ctx.closePath();
      ctx.fill();

      // Glowing Sanjeevani Herbs Cluster on the Mountain Peak
      for (let h = 0; h < 6; h++) {
        const hx = dronagiriX + 130 + (h % 3) * 25;
        const hy = 160 + Math.floor(h / 3) * 28;
        ctx.fillStyle = '#6EE7B7';
        ctx.beginPath();
        ctx.arc(hx, hy, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#FCD34D';
        ctx.beginPath();
        ctx.arc(hx, hy, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    // 8. OBSTACLES: Himalayan Mountain Peaks & Thunderclouds
    world.obstacles.forEach((obs) => {
      const sx = obs.x - scrollX;
      if (sx + obs.width < -50 || sx > V_WIDTH + 50) return;

      if (obs.isThunderCloud) {
        // TOP CLOUD OBSTACLE
        ctx.fillStyle = '#334155';
        ctx.beginPath();
        ctx.ellipse(sx + obs.width / 2, obs.gapTop / 2, obs.width * 0.8, obs.gapTop * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Subtle golden lightning spark in cloud
        ctx.strokeStyle = '#FCD34D';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(sx + obs.width * 0.4, obs.gapTop * 0.4);
        ctx.lineTo(sx + obs.width * 0.6, obs.gapTop * 0.6);
        ctx.lineTo(sx + obs.width * 0.45, obs.gapTop * 0.8);
        ctx.stroke();

        // BOTTOM CLOUD OBSTACLE
        ctx.fillStyle = '#1E293B';
        ctx.beginPath();
        ctx.ellipse(
          sx + obs.width / 2,
          obs.gapBottom + (V_HEIGHT - obs.gapBottom) / 2,
          obs.width * 0.85,
          (V_HEIGHT - obs.gapBottom) * 0.6,
          0,
          0,
          Math.PI * 2
        );
        ctx.fill();
      } else {
        // TOP MOUNTAIN CRAG (Himalayan Peak hanging downwards)
        const topGrad = ctx.createLinearGradient(sx, 0, sx + obs.width, obs.gapTop);
        topGrad.addColorStop(0, '#1E293B');
        topGrad.addColorStop(1, '#475569');
        ctx.fillStyle = topGrad;
        ctx.beginPath();
        ctx.moveTo(sx - 15, 0);
        ctx.lineTo(sx + obs.width / 2, obs.gapTop);
        ctx.lineTo(sx + obs.width + 15, 0);
        ctx.closePath();
        ctx.fill();

        // Snow tip on top crag
        ctx.fillStyle = '#E2E8F0';
        ctx.beginPath();
        ctx.moveTo(sx + obs.width * 0.25, obs.gapTop * 0.7);
        ctx.lineTo(sx + obs.width / 2, obs.gapTop);
        ctx.lineTo(sx + obs.width * 0.75, obs.gapTop * 0.7);
        ctx.closePath();
        ctx.fill();

        // BOTTOM MOUNTAIN PEAK (Rising from ground)
        const btmGrad = ctx.createLinearGradient(sx, obs.gapBottom, sx + obs.width, V_HEIGHT);
        btmGrad.addColorStop(0, '#475569');
        btmGrad.addColorStop(1, '#0F172A');
        ctx.fillStyle = btmGrad;
        ctx.beginPath();
        ctx.moveTo(sx - 15, V_HEIGHT);
        ctx.lineTo(sx + obs.width / 2, obs.gapBottom);
        ctx.lineTo(sx + obs.width + 15, V_HEIGHT);
        ctx.closePath();
        ctx.fill();

        // Snow crest on bottom peak
        ctx.fillStyle = '#F8FAFC';
        ctx.beginPath();
        ctx.moveTo(sx + obs.width * 0.25, obs.gapBottom + 35);
        ctx.lineTo(sx + obs.width / 2, obs.gapBottom);
        ctx.lineTo(sx + obs.width * 0.75, obs.gapBottom + 35);
        ctx.closePath();
        ctx.fill();
      }
    });

    // 9. SANJEEVANI HERB COLLECTIBLES (Glowing Luminous Herbs)
    world.herbs.forEach((herb) => {
      if (herb.collected) return;
      const hx = herb.x - scrollX;
      if (hx < -40 || hx > V_WIDTH + 40) return;

      const pulse = Math.sin(performance.now() * 0.006 + herb.pulsePhase) * 0.25 + 1;

      ctx.save();
      // Outer Divine Emerald & Gold Radiance
      const herbGlow = ctx.createRadialGradient(hx, herb.y, 4, hx, herb.y, herb.radius * 2.4 * pulse);
      herbGlow.addColorStop(0, 'rgba(110, 231, 183, 0.95)');
      herbGlow.addColorStop(0.4, 'rgba(52, 211, 153, 0.6)');
      herbGlow.addColorStop(0.8, 'rgba(252, 211, 77, 0.3)');
      herbGlow.addColorStop(1, 'rgba(16, 185, 129, 0)');
      ctx.fillStyle = herbGlow;
      ctx.beginPath();
      ctx.arc(hx, herb.y, herb.radius * 2.4 * pulse, 0, Math.PI * 2);
      ctx.fill();

      // Sacred Leaf Petals (Three-lobed divine herb)
      ctx.fillStyle = '#10B981';
      ctx.beginPath();
      ctx.ellipse(hx, herb.y - 7, 5, 8, 0, 0, Math.PI * 2);
      ctx.ellipse(hx - 6, herb.y + 4, 7, 5, -0.6, 0, Math.PI * 2);
      ctx.ellipse(hx + 6, herb.y + 4, 7, 5, 0.6, 0, Math.PI * 2);
      ctx.fill();

      // Glowing Center Jewel/Nectar
      ctx.fillStyle = '#FDE68A';
      ctx.beginPath();
      ctx.arc(hx, herb.y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // 10. PARTICLES & SPARKS
    world.particles.forEach((p) => {
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    // 11. FLOATING SCORE POPUPS (+100 🌿)
    world.popups.forEach((pop) => {
      ctx.save();
      ctx.globalAlpha = Math.max(0, pop.alpha);
      ctx.font = 'bold 20px "Noto Sans Devanagari", system-ui, sans-serif';
      ctx.fillStyle = '#FDE68A';
      ctx.strokeStyle = '#8B1E1E';
      ctx.lineWidth = 3;
      ctx.strokeText(pop.text, pop.x - 25, pop.y);
      ctx.fillText(pop.text, pop.x - 25, pop.y);
      ctx.restore();
    });

    // 12. PLAYABLE CHARACTER: LORD HANUMAN (DETAILED VECTOR ART ON CANVAS)
    ctx.save();
    ctx.translate(player.x, player.y);
    ctx.rotate(player.tilt);

    // A. DIVINE HALO (आभामंडल / Tej Aura)
    const haloGlow = ctx.createRadialGradient(0, 0, 10, 0, 0, 50);
    haloGlow.addColorStop(0, 'rgba(255, 243, 199, 0.85)');
    haloGlow.addColorStop(0.4, 'rgba(245, 158, 11, 0.55)');
    haloGlow.addColorStop(1, 'rgba(234, 88, 12, 0)');
    ctx.fillStyle = haloGlow;
    ctx.beginPath();
    ctx.arc(0, 0, 50, 0, Math.PI * 2);
    ctx.fill();

    // B. CURVED SOARING TAIL (लांगूल)
    ctx.strokeStyle = '#F97316';
    ctx.lineWidth = 7;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-18, 6);
    ctx.quadraticCurveTo(-46, -26, -26, -42);
    ctx.quadraticCurveTo(-8, -52, -16, -34);
    ctx.stroke();

    // Tail tip with golden tuft
    ctx.fillStyle = '#D4A64A';
    ctx.beginPath();
    ctx.arc(-16, -34, 4.5, 0, Math.PI * 2);
    ctx.fill();

    // C. FLYING SAFFRON SCARF / UTTARIYA (Floating in wind)
    ctx.fillStyle = '#F28C28';
    ctx.strokeStyle = '#D4A64A';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-14, 0);
    ctx.quadraticCurveTo(-38, -6, -50, -2);
    ctx.quadraticCurveTo(-38, 8, -14, 10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // D. DIVINE BODY / TORSO IN FLIGHT
    ctx.fillStyle = '#FFAE73'; // Warm complexion
    ctx.beginPath();
    ctx.ellipse(0, 4, 18, 11, -0.2, 0, Math.PI * 2);
    ctx.fill();

    // Saffron Dhoti (पीताम्बर)
    ctx.fillStyle = '#EA580C';
    ctx.beginPath();
    ctx.ellipse(-8, 6, 12, 8, -0.1, 0, Math.PI * 2);
    ctx.fill();

    // Golden waist belt (कटिसूत्र)
    ctx.strokeStyle = '#FBBF24';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(-4, 6, 10, -0.6, 0.6);
    ctx.stroke();

    // Legs outstretched in graceful flight
    ctx.strokeStyle = '#FFAE73';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(-14, 6);
    ctx.lineTo(-32, 10); // Leg 1
    ctx.moveTo(-12, 10);
    ctx.lineTo(-28, 18); // Leg 2
    ctx.stroke();

    // E. GOLDEN GADA (Mace) HELD PROUDLY IN HAND
    ctx.save();
    ctx.translate(-4, 14);
    ctx.rotate(0.3);
    // Gada shaft
    ctx.strokeStyle = '#FBBF24';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(8, 22);
    ctx.stroke();
    // Gada head (Golden spherical ribbed mace)
    ctx.fillStyle = '#F59E0B';
    ctx.strokeStyle = '#8B1E1E';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(10, 24, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // F. FORWARD ARM (Pointing towards Dronagiri)
    ctx.strokeStyle = '#FFAE73';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(8, 2);
    ctx.lineTo(26, -2);
    ctx.stroke();

    // G. HEAD, FACE, AND NOBLE FEATURES
    ctx.fillStyle = '#FFAE73';
    ctx.beginPath();
    ctx.arc(14, -8, 13, 0, Math.PI * 2);
    ctx.fill();

    // Gentle facial jaw
    ctx.fillStyle = '#F97316';
    ctx.beginPath();
    ctx.ellipse(22, -6, 5, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Divine eye
    ctx.fillStyle = '#3D2418';
    ctx.beginPath();
    ctx.arc(18, -10, 2, 0, Math.PI * 2);
    ctx.fill();

    // Sacred Red Vermilion Tilak (सिंदूर तिलक)
    ctx.fillStyle = '#B91C1C';
    ctx.beginPath();
    ctx.moveTo(18, -15);
    ctx.lineTo(21, -12);
    ctx.lineTo(18, -9);
    ctx.closePath();
    ctx.fill();

    // Golden Kundal (Earring)
    ctx.fillStyle = '#FBBF24';
    ctx.beginPath();
    ctx.arc(10, -7, 3, 0, Math.PI * 2);
    ctx.fill();

    // H. ORNATE GOLDEN CROWN (दिव्य मुकुट)
    ctx.fillStyle = '#F59E0B';
    ctx.strokeStyle = '#8B1E1E';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(11, -17);
    ctx.lineTo(24, -13);
    ctx.lineTo(19, -29); // Crown apex
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Crown centerpiece jewel (माणिक्य)
    ctx.fillStyle = '#DC2626';
    ctx.beginPath();
    ctx.arc(18, -20, 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // 13. GROUND TERRAIN STRIP
    ctx.fillStyle = '#1E1B4B';
    ctx.fillRect(0, V_HEIGHT - 8, V_WIDTH, 8);
    ctx.strokeStyle = '#D4A64A';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, V_HEIGHT - 8);
    ctx.lineTo(V_WIDTH, V_HEIGHT - 8);
    ctx.stroke();

    ctx.restore();
  };

  /**
   * Main 60 FPS Animation Loop
   */
  useEffect(() => {
    let isSubscribed = true;

    const gameLoop = (timestamp) => {
      if (!isSubscribed) return;

      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }
      // Calculate delta time in seconds, capped at 0.1s to avoid physics spiral
      const dt = Math.min(0.08, (timestamp - lastTimeRef.current) / 1000);
      lastTimeRef.current = timestamp;

      if (gameStateRef.current === 'playing') {
        updatePhysics(dt);
      }

      renderCanvas();

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      isSubscribed = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  /**
   * Dynamic Canvas Resize & DPI Scaling
   */
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      // Crisp rendering
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      renderCanvas();
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Distance progress percentage
  const progressPercent = Math.min(100, Math.floor((distance / TARGET_DISTANCE) * 100));

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#110A07] via-[#24130D] to-[#110A07] text-[#FFF8E8] flex flex-col items-center justify-start py-4 px-2 sm:px-4 select-none relative overflow-x-hidden">
      {/* Top Header Navigation */}
      <div className="w-full max-w-4xl flex items-center justify-between py-2 px-1 mb-2">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gold hover:text-saffron transition-colors py-1.5 px-3 rounded-xl bg-black/40 border border-gold/30 hover:border-gold active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>मंदिर मुख्य पृष्ठ</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'ध्वनि चालू करें' : 'ध्वनि बंद करें'}
            className="p-2 rounded-xl bg-black/40 border border-gold/30 text-gold hover:text-white transition-all active:scale-90"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Rules / Help Button */}
          <button
            onClick={() => setShowHowToPlay(true)}
            aria-label="खेल के नियम"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gold py-1.5 px-3 rounded-xl bg-black/40 border border-gold/30 hover:border-gold active:scale-95"
          >
            <HelpCircle className="w-4 h-4" />
            <span className="hidden sm:inline">नियम</span>
          </button>
        </div>
      </div>

      {/* Main Game Card Viewport */}
      <div className="w-full max-w-4xl relative rounded-2xl sm:rounded-3xl border-2 border-gold/40 shadow-2xl overflow-hidden bg-black/80 flex flex-col">
        {/* IN-GAME TOP HUD (Always visible during 'playing' or 'paused') */}
        {(gameState === 'playing' || gameState === 'paused') && (
          <div className="absolute top-0 left-0 right-0 z-20 game-hud-panel px-3 sm:px-5 py-2.5 border-b border-gold/30 flex items-center justify-between gap-2 text-xs sm:text-sm">
            {/* Score & Herbs */}
            <div className="flex items-center gap-3 sm:gap-5">
              <div className="flex items-center gap-1.5 bg-black/50 px-2.5 py-1 rounded-lg border border-gold/20">
                <Flame className="w-3.5 h-3.5 text-saffron" />
                <span className="text-gray-300">स्कोर:</span>
                <span className="font-extrabold text-white font-mono">{score}</span>
              </div>

              <div className="flex items-center gap-1.5 bg-black/50 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-gray-300">बूटी:</span>
                <span className="font-extrabold text-emerald-400 font-mono">{herbsCollected}</span>
              </div>
            </div>

            {/* Mission Distance Progress Bar */}
            <div className="hidden md:flex flex-col items-center flex-1 max-w-xs mx-4">
              <div className="flex justify-between w-full text-[11px] font-semibold text-gold mb-1">
                <span>यात्रा प्रगति</span>
                <span>{distance}m / {TARGET_DISTANCE}m ({progressPercent}%)</span>
              </div>
              <div className="w-full bg-black/60 rounded-full h-2 border border-gold/30 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-saffron to-emerald-400 h-full rounded-full transition-all duration-200"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Pause & High Score */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1 bg-black/50 px-2.5 py-1 rounded-lg border border-gold/20 text-gold text-xs">
                <Trophy className="w-3 h-3" />
                <span className="font-mono">{bestScore}</span>
              </div>

              <button
                onClick={gameState === 'playing' ? pauseGame : resumeGame}
                className="p-1.5 sm:px-3 sm:py-1 rounded-lg bg-saffron/20 border border-saffron/40 hover:bg-saffron/30 text-saffron-light font-bold flex items-center gap-1 transition-all active:scale-95"
              >
                {gameState === 'playing' ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span className="hidden sm:inline text-xs">रोकें</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span className="hidden sm:inline text-xs">जारी रखें</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* INTERACTIVE CANVAS GAMEPLAY AREA */}
        <div
          className="relative w-full aspect-[5/3] min-h-[340px] sm:min-h-[460px] md:min-h-[520px] game-canvas-container flex items-center justify-center cursor-pointer"
          onPointerDown={triggerFlap}
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full block"
            style={{ width: '100%', height: '100%' }}
          />

          {/* SCREEN A: GAME INTRODUCTION SCREEN */}
          {gameState === 'intro' && (
            <div className="absolute inset-0 z-30 bg-gradient-to-b from-black/90 via-[#261208]/95 to-black/90 flex flex-col items-center justify-between p-4 sm:p-8 text-center backdrop-blur-sm">
              {/* Header Title */}
              <div className="space-y-1.5 mt-2">
                <span className="inline-block text-xs sm:text-sm font-extrabold tracking-widest text-saffron uppercase bg-saffron/10 px-3.5 py-1 rounded-full border border-saffron/30">
                  ॥ जय श्री राम ॥ जय संकट मोचन हनुमान ॥
                </span>
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-gold to-saffron-light font-heading tracking-wide mt-2">
                  SANJEEVANI ADVENTURE
                </h1>
                <p className="text-sm sm:text-base text-gold/90 font-semibold">
                  श्री हनुमान जी की पावन यात्रा (Hanuman Ji's Divine Journey)
                </p>
              </div>

              {/* Devotional Hero Visual */}
              <div className="relative my-2 sm:my-4 flex items-center justify-center">
                <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-full bg-gradient-to-b from-saffron/30 to-templeRed/30 border-2 border-gold/50 flex items-center justify-center shadow-2xl p-2 animate-flight-float">
                  <img
                    src="/assets/images/story-sanjeevani.svg"
                    alt="हनुमान जी द्रोणागिरि पर्वत ले जाते हुए"
                    className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]"
                  />
                </div>
              </div>

              {/* Story Context */}
              <p className="max-w-lg text-xs sm:text-sm text-gray-300 leading-relaxed px-2">
                लक्ष्मण जी के प्राणों की रक्षा हेतु दिव्य संजीवनी बूटी लाने के लिए श्री हनुमान जी द्रोणागिरि पर्वत की ओर उड़ रहे हैं। पर्वतों और बादलों से बचते हुए दिव्य बूटियाँ एकत्रित करें और गंतव्य तक पहुंचें!
              </p>

              {/* Buttons and Best Score */}
              <div className="space-y-3 w-full max-w-xs sm:max-w-sm mt-3 mb-2">
                <button
                  onClick={startGame}
                  className="w-full py-3.5 sm:py-4 px-6 rounded-2xl bg-gradient-to-r from-saffron via-saffron-deep to-templeRed text-white font-extrabold text-base sm:text-lg shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 border border-gold/40 animate-divine-glow"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>साहसिक यात्रा आरंभ करें</span>
                </button>

                <div className="flex items-center justify-between text-xs sm:text-sm text-gold/80 px-2 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-gold" />
                    <span>उच्चतम स्कोर:</span>
                    <span className="font-mono font-bold text-white text-sm">{bestScore}</span>
                  </div>

                  <button
                    onClick={() => setShowHowToPlay(true)}
                    className="text-saffron-light hover:underline flex items-center gap-1"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>खेल नियम</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN C: PAUSE SCREEN */}
          {gameState === 'paused' && (
            <div className="absolute inset-0 z-30 bg-black/85 flex flex-col items-center justify-center p-6 text-center backdrop-blur-md">
              <div className="bg-gradient-to-b from-[#2E1810] to-[#1A0E08] p-6 sm:p-8 rounded-3xl border-2 border-gold/50 shadow-2xl max-w-sm w-full space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-saffron/20 border border-saffron/40 flex items-center justify-center mx-auto text-saffron">
                  <Pause className="w-6 h-6" />
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-gold font-heading">
                  खेल रुका हुआ है
                </h2>
                <p className="text-xs text-gray-300">
                  वर्तमान स्कोर: <span className="font-bold text-white font-mono">{score}</span> | बूटियाँ: <span className="font-bold text-emerald-400 font-mono">{herbsCollected}</span>
                </p>

                <div className="space-y-2.5 pt-2">
                  <button
                    onClick={resumeGame}
                    className="w-full py-3 px-4 rounded-xl bg-saffron hover:bg-saffron-deep text-white font-bold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>यात्रा जारी रखें (Resume)</span>
                  </button>

                  <button
                    onClick={startGame}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>पुनः प्रारंभ करें</span>
                  </button>

                  <button
                    onClick={returnToGameHome}
                    className="w-full py-2 px-4 rounded-xl text-gray-400 hover:text-white text-xs transition-colors"
                  >
                    होम स्क्रीन पर जाएं
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN D: GAME OVER SCREEN */}
          {gameState === 'gameover' && (
            <div className="absolute inset-0 z-30 bg-black/90 flex flex-col items-center justify-center p-4 sm:p-6 text-center backdrop-blur-md">
              <div className="bg-gradient-to-b from-[#2E1410] via-[#1F0C08] to-[#120504] p-6 sm:p-8 rounded-3xl border-2 border-templeRed/60 shadow-2xl max-w-md w-full space-y-4">
                <div className="w-14 h-14 rounded-full bg-templeRed/30 border border-templeRed flex items-center justify-center mx-auto text-amber-400">
                  <AlertTriangle className="w-7 h-7 text-saffron" />
                </div>

                <div className="space-y-1">
                  <h2 className="text-2xl sm:text-3xl font-black text-amber-200 font-heading">
                    यात्रा विश्राम
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-300">
                    हनुमान जी पर्वत शिखर से स्पर्श हो गए। प्रभु की कृपा से पुनः प्रयास करें!
                  </p>
                </div>

                {/* Score Summary Box */}
                <div className="bg-black/60 rounded-2xl p-4 border border-gold/30 grid grid-cols-2 gap-3 text-left">
                  <div>
                    <span className="text-[11px] text-gray-400 block">इस यात्रा का स्कोर</span>
                    <span className="text-xl font-extrabold text-white font-mono">{score}</span>
                  </div>

                  <div>
                    <span className="text-[11px] text-gray-400 block">एकत्रित बूटियाँ</span>
                    <span className="text-xl font-extrabold text-emerald-400 font-mono">
                      {herbsCollected} 🌿
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] text-gray-400 block">तय की गई दूरी</span>
                    <span className="text-sm font-bold text-gold font-mono">{distance}m</span>
                  </div>

                  <div>
                    <span className="text-[11px] text-gray-400 block">व्यक्तिगत सर्वश्रेष्ठ</span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold text-amber-300 font-mono">{bestScore}</span>
                      {isNewHighScore && (
                        <span className="text-[10px] bg-amber-500/30 text-amber-300 px-1.5 py-0.5 rounded font-bold">
                          नया!
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2.5 pt-2">
                  <button
                    onClick={startGame}
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-saffron to-templeRed hover:brightness-110 text-white font-extrabold text-sm sm:text-base shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 border border-gold/40"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>पुनः उड़ान भरें (Retry Adventure)</span>
                  </button>

                  <div className="flex gap-2">
                    <button
                      onClick={returnToGameHome}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
                    >
                      गेम मेनू
                    </button>

                    <Link
                      to="/"
                      className="flex-1 py-2.5 px-3 rounded-xl bg-black/40 hover:bg-black/60 border border-gold/30 text-gold font-semibold text-xs transition-colors flex items-center justify-center gap-1"
                    >
                      <span>मंदिर होम</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN E: MISSION COMPLETE SCREEN (VICTORY) */}
          {gameState === 'victory' && (
            <div className="absolute inset-0 z-30 bg-gradient-to-b from-black/95 via-[#1E291C]/95 to-black/95 flex flex-col items-center justify-center p-4 sm:p-6 text-center backdrop-blur-md relative overflow-hidden">
              {/* Falling Celebratory Petals in background */}
              {[...Array(16)].map((_, i) => (
                <div
                  key={i}
                  className="victory-petal"
                  style={{
                    left: `${(i * 6.25) % 100}%`,
                    animationDuration: `${3.5 + (i % 5) * 0.8}s`,
                    animationDelay: `${(i % 6) * 0.4}s`
                  }}
                >
                  <span className="text-lg">
                    {i % 3 === 0 ? '🌸' : i % 3 === 1 ? '🌼' : '✨'}
                  </span>
                </div>
              ))}

              <div className="bg-gradient-to-b from-[#182C1F] via-[#101E15] to-[#0A120D] p-6 sm:p-8 rounded-3xl border-2 border-emerald-400/60 shadow-2xl max-w-md w-full space-y-4 relative z-10">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-300 animate-pulse">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-bold text-emerald-400 tracking-widest uppercase">
                    ॥ जय श्री राम ॥
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-amber-200 font-heading">
                    मिशन पूर्ण! पावन संजीवनी प्राप्त
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                    श्री हनुमान जी ने द्रोणागिरि पर्वत पर पहुंचकर दिव्य संजीवनी बूटी प्राप्त कर ली। लक्ष्मण जी के प्राणों की रक्षा का मार्ग प्रशस्त हुआ!
                  </p>
                </div>

                {/* Score & Stats */}
                <div className="bg-black/60 rounded-2xl p-4 border border-emerald-500/40 grid grid-cols-2 gap-3 text-left">
                  <div>
                    <span className="text-[11px] text-gray-400 block">अंतिम स्कोर</span>
                    <span className="text-2xl font-black text-emerald-300 font-mono">{score}</span>
                  </div>

                  <div>
                    <span className="text-[11px] text-gray-400 block">एकत्रित बूटियाँ</span>
                    <span className="text-2xl font-black text-amber-300 font-mono">
                      {herbsCollected} 🌿
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] text-gray-400 block">तय दूरी</span>
                    <span className="text-sm font-bold text-white font-mono">
                      {TARGET_DISTANCE}m (100%)
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] text-gray-400 block">सर्वश्रेष्ठ रिकॉर्ड</span>
                    <span className="text-sm font-bold text-gold font-mono">{bestScore}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2.5 pt-2">
                  <button
                    onClick={startGame}
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-saffron hover:brightness-110 text-white font-extrabold text-sm sm:text-base shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 border border-emerald-300/50"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>पुनः खेलें (Play Again)</span>
                  </button>

                  <div className="flex gap-2">
                    <button
                      onClick={returnToGameHome}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
                    >
                      गेम मेनू
                    </button>

                    <Link
                      to="/"
                      className="flex-1 py-2.5 px-3 rounded-xl bg-black/40 hover:bg-black/60 border border-gold/30 text-gold font-semibold text-xs transition-colors flex items-center justify-center gap-1"
                    >
                      <span>मंदिर मुख्य पृष्ठ</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM HELPFUL CONTROLS BAR (During active play) */}
        {gameState === 'playing' && (
          <div className="bg-[#180E09] border-t border-gold/20 p-2.5 flex items-center justify-between text-xs text-gray-400 px-4">
            <span className="hidden sm:inline">
              🕹️ <span className="text-gold font-semibold">नियंत्रण:</span> स्पेसबार या माउस क्लिक से ऊपर उड़ें | <span className="text-gold font-semibold">Esc:</span> पॉज़
            </span>
            <span className="sm:hidden text-center w-full text-gold font-medium">
              👆 उड़ने के लिए स्क्रीन पर कहीं भी टैप करें (Tap to Fly)
            </span>
          </div>
        )}
      </div>

      {/* HOW TO PLAY MODAL */}
      {showHowToPlay && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-gradient-to-b from-[#2E1810] to-[#1A0E08] max-w-md w-full rounded-3xl border-2 border-gold/50 shadow-2xl p-5 sm:p-6 text-left space-y-4">
            <div className="flex items-center justify-between border-b border-gold/30 pb-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-saffron" />
                <h3 className="text-base sm:text-lg font-bold text-white font-heading">
                  खेल के नियम एवं निर्देश
                </h3>
              </div>
              <button
                onClick={() => setShowHowToPlay(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-gray-300 leading-relaxed">
              <div className="p-3 bg-black/40 rounded-xl border border-gold/20 flex gap-3">
                <span className="text-xl">✈️</span>
                <div>
                  <h4 className="font-bold text-gold">उड़ान नियंत्रण (Flight Controls)</h4>
                  <p className="text-xs text-gray-300 mt-0.5">
                    <strong>मोबाइल:</strong> स्क्रीन पर कहीं भी टैप करें।<br />
                    <strong>कंप्यूटर:</strong> Spacebar, Up Arrow या माउस क्लिक का उपयोग करें।
                  </p>
                </div>
              </div>

              <div className="p-3 bg-black/40 rounded-xl border border-gold/20 flex gap-3">
                <span className="text-xl">🌿</span>
                <div>
                  <h4 className="font-bold text-gold">संजीवनी बूटी (Collect Herbs)</h4>
                  <p className="text-xs text-gray-300 mt-0.5">
                    आकाश मार्ग में चमकती हुई पावन संजीवनी बूटियों को एकत्रित करें। प्रत्येक बूटी से <strong>+100 अतिरिक्त अंक</strong> मिलते हैं।
                  </p>
                </div>
              </div>

              <div className="p-3 bg-black/40 rounded-xl border border-gold/20 flex gap-3">
                <span className="text-xl">⛰️</span>
                <div>
                  <h4 className="font-bold text-gold">बाधाओं से बचाव (Avoid Obstacles)</h4>
                  <p className="text-xs text-gray-300 mt-0.5">
                    हिमालय के नुकीले पर्वत शिखरों और गर्जना करते बादलों से बचकर सुरक्षित उड़ें।
                  </p>
                </div>
              </div>

              <div className="p-3 bg-black/40 rounded-xl border border-gold/20 flex gap-3">
                <span className="text-xl">🏔️</span>
                <div>
                  <h4 className="font-bold text-gold">मिशन पूर्ण (Mission Goal)</h4>
                  <p className="text-xs text-gray-300 mt-0.5">
                    2,500 मीटर की पावन यात्रा पूर्ण कर द्रोणागिरि पर्वत तक पहुंचें और विजय प्राप्त करें!
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowHowToPlay(false)}
              className="w-full py-3 bg-saffron hover:bg-saffron-deep text-white font-bold text-sm rounded-xl transition-all"
            >
              समझ गया, खेलना शुरू करें
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
