 let gameState = {
    isPlaying: false,
    score: 0,
    highScore: 0,
    obstacles: [],
    gameSpeed: 2,
    spawnRate: 0.02,
    lastObstacleTime: 0,
    soundEnabled: false,
    musicEnabled: false,
    difficulty: 'Normal',
    isJumping: false
};

        
const difficultySettings = {
    'Easy': { speed: 1.5, spawnRate: 0.015, scoreMultiplier: 0.8 },
    'Normal': { speed: 2, spawnRate: 0.02, scoreMultiplier: 1 },
    'Hard': { speed: 3, spawnRate: 0.025, scoreMultiplier: 1.5 }
};
        
    const menuScreen = document.getElementById('menuScreen');
    const gameScreen = document.getElementById('gameScreen');
    const chicken = document.getElementById('chicken');
    const scoreElement = document.getElementById('score');
    const highScoreElement = document.getElementById('highScore');
    const gameOverScreen = document.getElementById('gameOver');
    const finalScoreElement = document.getElementById('finalScore');
        
    highScoreElement.textContent = gameState.highScore;
        

const clickSound = document.getElementById('clickSound');
const jumpSound = document.getElementById('jumpSound');
const gameOverSound = document.getElementById('gameOverSound');
const bgMusic = document.getElementById('bgMusic');

function playClickSound() {
    if (!gameState.soundEnabled) return;
    clickSound.currentTime = 0;
    clickSound.play();
}

function playJumpSound() {
    if (!gameState.soundEnabled) return;
    jumpSound.currentTime = 0;
    jumpSound.play();
}

function playGameOverSound() {
    if (!gameState.soundEnabled) return;
    gameOverSound.currentTime = 0;
    gameOverSound.play();
}


        
function startGame() {
    playClickSound();
    menuScreen.style.display = 'none';
    gameScreen.style.display = 'block';

    if (gameState.musicEnabled) {
        bgMusic.currentTime = 0;
        bgMusic.play();
    }

    initGame();
}

        
function backToMenu() {
            playClickSound();
            gameScreen.style.display = 'none';
            menuScreen.style.display = 'flex';
            gameOverScreen.style.display = 'none';
            bgMusic.pause();
            gameOverSound.pause();
            resetGame();
        }
        
        function showOptions() {
            playClickSound();
            document.getElementById('optionsModal').style.display = 'flex';
        }
        
        function showCredits() {
            playClickSound();
            document.getElementById('creditsModal').style.display = 'flex';
        }
        
        function closeModal(modalId) {
            playClickSound();
            document.getElementById(modalId).style.display = 'none';
        }
        
        function toggleSound() {
            gameState.soundEnabled = !gameState.soundEnabled;
            const btn = document.getElementById('soundBtn');
            btn.textContent = gameState.soundEnabled ? 'ON' : 'OFF';
            btn.classList.toggle('active', gameState.soundEnabled);
            playClickSound();
        }
        
       function toggleMusic() {
    gameState.musicEnabled = !gameState.musicEnabled;
    const btn = document.getElementById('musicBtn');
    btn.textContent = gameState.musicEnabled ? 'ON' : 'OFF';
    btn.classList.toggle('active', gameState.musicEnabled);
    playClickSound();

    if (gameState.musicEnabled) {
        bgMusic.currentTime = 0;
        bgMusic.play();
    } else {
        bgMusic.pause();
    }
}

        
function changeDifficulty() {
            const difficulties = ['Easy', 'Normal', 'Hard'];
            const currentIndex = difficulties.indexOf(gameState.difficulty);
            const nextIndex = (currentIndex + 1) % difficulties.length;
            gameState.difficulty = difficulties[nextIndex];
            
            const btn = document.getElementById('difficultyBtn');
            btn.textContent = gameState.difficulty;
            
            const settings = difficultySettings[gameState.difficulty];
            gameState.gameSpeed = settings.speed;
            gameState.spawnRate = settings.spawnRate;
            
            playClickSound();
        }
        
        function initGame() {
            gameState.isPlaying = true;
            gameState.score = 0;
            gameState.obstacles = [];
            gameState.lastObstacleTime = Date.now();
            scoreElement.textContent = '0';
            gameLoop();
        }
        
        function resetGame() {
            gameState.isPlaying = false;
            gameState.obstacles = [];
            chicken.classList.remove('jumping');
            
            document.querySelectorAll('.obstacle').forEach(obs => obs.remove());
        }
        
        function restartGame() {
            playClickSound();
            gameOverScreen.style.display = 'none';
            bgMusic.currentTime = 0;
            bgMusic.play();
            gameOverSound.pause();
            resetGame();
            initGame();
        }
        
function jump() {
    if (!gameState.isPlaying || gameState.isJumping) return;

    gameState.isJumping = true;
    chicken.classList.add('jumping');
    playJumpSound();

    setTimeout(() => {
        chicken.classList.remove('jumping');
        gameState.isJumping = false; 
    }, 500); 
}

        
