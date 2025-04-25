// DOM 요소
const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');

const inputHours = document.getElementById('input-hours');
const inputMinutes = document.getElementById('input-minutes');
const inputSeconds = document.getElementById('input-seconds');

const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');

const customTitleInput = document.getElementById('custom-title');
const updateTitleBtn = document.getElementById('update-title-btn');
const timerTitle = document.getElementById('timer-title');

const themeToggleBtn = document.getElementById('theme-toggle-btn');
const body = document.body;

// 변수
let totalSeconds = 0;
let countdownInterval;
let isRunning = false;

// 타이머 초기화 함수
function initializeTimer() {
    hoursDisplay.textContent = formatTime(0);
    minutesDisplay.textContent = formatTime(0);
    secondsDisplay.textContent = formatTime(0);
}

// 시간 포맷팅 함수 (항상 두 자리 숫자로 표시)
function formatTime(time) {
    return time.toString().padStart(2, '0');
}

// 카운트다운 업데이트 함수
function updateCountdown() {
    if (totalSeconds <= 0) {
        clearInterval(countdownInterval);
        isRunning = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        
        // 타이머가 끝났을 때 알림 표시
        alert('타이머가 종료되었습니다!');
        return;
    }
    
    totalSeconds--;
    
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    hoursDisplay.textContent = formatTime(hours);
    minutesDisplay.textContent = formatTime(minutes);
    secondsDisplay.textContent = formatTime(seconds);
}

// 타이머 시작 함수
function startTimer() {
    if (isRunning) return;
    
    if (!countdownInterval) {
        // 시간 입력값 가져오기
        const hours = parseInt(inputHours.value) || 0;
        const minutes = parseInt(inputMinutes.value) || 0;
        const seconds = parseInt(inputSeconds.value) || 0;
        
        // 총 시간(초)
        totalSeconds = hours * 3600 + minutes * 60 + seconds;
        
        // 유효성 검사
        if (totalSeconds <= 0) {
            alert('시간을 설정해주세요.');
            return;
        }
        
        // 디스플레이 초기 설정
        hoursDisplay.textContent = formatTime(hours);
        minutesDisplay.textContent = formatTime(minutes);
        secondsDisplay.textContent = formatTime(seconds);
    }
    
    isRunning = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    
    countdownInterval = setInterval(updateCountdown, 1000);
}

// 타이머 일시정지 함수
function pauseTimer() {
    if (!isRunning) return;
    
    clearInterval(countdownInterval);
    isRunning = false;
    
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

// 타이머 초기화 함수
function resetTimer() {
    clearInterval(countdownInterval);
    isRunning = false;
    countdownInterval = null;
    
    inputHours.value = 0;
    inputMinutes.value = 0;
    inputSeconds.value = 0;
    
    initializeTimer();
    
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

// 타이틀 업데이트 함수
function updateTitle() {
    const newTitle = customTitleInput.value.trim();
    if (newTitle) {
        timerTitle.textContent = newTitle;
        document.title = newTitle; // 페이지 타이틀도 변경
    } else {
        alert('제목을 입력해주세요.');
    }
}

// 테마 토글 함수
function toggleTheme() {
    if (body.classList.contains('theme-light')) {
        body.classList.remove('theme-light');
        body.classList.add('theme-dark');
        themeToggleBtn.textContent = '라이트 모드';
    } else {
        body.classList.remove('theme-dark');
        body.classList.add('theme-light');
        themeToggleBtn.textContent = '다크 모드';
    }
}

// 이벤트 리스너
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
updateTitleBtn.addEventListener('click', updateTitle);
themeToggleBtn.addEventListener('click', toggleTheme);

// 초기화
initializeTimer(); 