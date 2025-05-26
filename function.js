function spawnObstacle() {
    const now = Date.now();
    if (now - gameState.lastObstacleTime > (90 / gameState.spawnRate)) {
        const obstacle = document.createElement('div');
        obstacle.className = 'obstacle';


        const obstacleImg = document.createElement('img');
        obstacleImg.src = 'images/drip.png'; 
        obstacleImg.alt = 'Lava Pool';
        obstacleImg.className = 'obstacle-img';

        obstacle.appendChild(obstacleImg);
        obstacle.style.animationDuration = (5 / gameState.gameSpeed) + 's';
        gameScreen.appendChild(obstacle);

        gameState.obstacles.push({
            element: obstacle,
            passed: false
        });

        gameState.lastObstacleTime = now;


        setTimeout(() => {
            if (obstacle.parentNode) {
                obstacle.remove();
            }
        }, 6000);
    }
}

function spawnFlyingObstacle() {
    const now = Date.now();

    if (now - (gameState.lastFlyingTime || 0) > (200 / gameState.spawnRate)) {
        const flyingObstacle = document.createElement('div');
        flyingObstacle.className = 'flying-obstacle';

        const flyingImg = document.createElement('img');
        flyingImg.src = 'images/bat.png'; 
        flyingImg.alt = 'Flying Enemy';
        flyingImg.className = 'obstacle-img';

        flyingObstacle.appendChild(flyingImg);

        const randomTop = Math.floor(Math.random() * 100) + 330;
        flyingObstacle.style.top = `${randomTop}px`;

        flyingObstacle.style.animationDuration = (5 / gameState.gameSpeed) + 's';

        gameScreen.appendChild(flyingObstacle);

        gameState.lastFlyingTime = now;

        
        setTimeout(() => {
            if (flyingObstacle.parentNode) {
                flyingObstacle.remove();
            }
        }, 6000);
    }
}

        
function checkCollisions() {
        const chickenRect = chicken.getBoundingClientRect();
            gameState.obstacles.forEach((obs, index) => {
                const obsRect = obs.element.getBoundingClientRect();

                if (chickenRect.left < obsRect.right &&
                    chickenRect.right > obsRect.left &&
                    chickenRect.top < obsRect.bottom &&
                    chickenRect.bottom > obsRect.top) {
                    gameOver();
                    return;
                }
                
 
                if (!obs.passed && obsRect.right < chickenRect.left) {
                    obs.passed = true;
                    gameState.score += Math.floor(10 * difficultySettings[gameState.difficulty].scoreMultiplier);
                    scoreElement.textContent = gameState.score;
                    
          
                    if (gameState.score % 100 === 0) {
                        gameState.gameSpeed += 0.1;
                        gameState.spawnRate += 0.002;
                    }
                }
            });
            document.querySelectorAll('.flying-obstacle').forEach(fly => {
            const flyRect = fly.getBoundingClientRect();
            const chickenRect = chicken.getBoundingClientRect();

            if (chickenRect.left < flyRect.right &&
                chickenRect.right > flyRect.left &&
                chickenRect.top < flyRect.bottom &&
                chickenRect.bottom > flyRect.top) {
                 gameOver("You hit the bat!🦇");
            }
        });


            gameState.obstacles = gameState.obstacles.filter(obs => 
                obs.element.parentNode !== null
            );
        }
        
   function gameOver(reason = "Your chicken hit a rock!🗿") {
    gameState.isPlaying = false;
    playGameOverSound();

    if (gameState.musicEnabled) {
        bgMusic.pause();
    }

    if (gameState.score > gameState.highScore) {
        gameState.highScore = gameState.score;
        highScoreElement.textContent = gameState.highScore;
    }

    finalScoreElement.textContent = gameState.score;
    document.querySelector('#gameOver p').textContent = reason; 
    gameOverScreen.style.display = 'block';
}


    function gameLoop() {
    if (!gameState.isPlaying) return;

    spawnObstacle();
    spawnFlyingObstacle(); 
    checkCollisions();

    requestAnimationFrame(gameLoop);
}

        
        document.addEventListener('keydown', function(event) {
            if (event.code === 'Space') {
                event.preventDefault();
                jump();
            }
            
            if (event.key === 'Escape') {
                closeModal('optionsModal');
                closeModal('creditsModal');
            }
        });
        
        document.addEventListener('click', function(event) {
            if (gameState.isPlaying && !event.target.closest('.modal') && !event.target.closest('.game-over')) {
                jump();
            }
        });
       
        window.onclick = function(event) {
            const optionsModal = document.getElementById('optionsModal');
            const creditsModal = document.getElementById('creditsModal');
            
            if (event.target == optionsModal) {
                optionsModal.style.display = 'none';
            }
            if (event.target == creditsModal) {
                creditsModal.style.display = 'none';
            }
        }
        
  
        document.querySelectorAll('.menu-button, .option-button, .close-btn').forEach(button => {
            button.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 100);
            });
        });
        
        function animateMenuChicken() {
            const menuChicken = document.querySelector('.menu-chicken');
            if (menuChicken) {
                setInterval(() => {
                    const randomDelay = Math.random() * 2000 + 1000;
                    setTimeout(() => {
                        menuChicken.style.transform = `translateX(${Math.random() * 40 - 20}px)`;
                    }, randomDelay);
                }, 3000);
            }
        }
        
animateMenuChicken();
console.log('🐔 Welcome to Chicken Jockey! Ready to ride? 🏇');