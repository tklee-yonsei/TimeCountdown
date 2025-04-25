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

// 풀스크린 관련 요소
const fullscreenBtn = document.getElementById('fullscreen-btn');
const exitFullscreenBtn = document.getElementById('fs-exit-btn');
const fsPlayPauseBtn = document.getElementById('fs-play-pause-btn');
const fsPlayPauseIcon = fsPlayPauseBtn.querySelector('i');
const mainContainer = document.getElementById('main-container');
const fullscreenContainer = document.getElementById('fullscreen-container');
const fullscreenContent = document.querySelector('.fullscreen-content');
const fullscreenTitle = document.getElementById('fullscreen-title');
const fsHoursDisplay = document.getElementById('fs-hours');
const fsMinutesDisplay = document.getElementById('fs-minutes');
const fsSecondsDisplay = document.getElementById('fs-seconds');
const dragHandle = document.getElementById('drag-handle');

// 변수
let totalSeconds = 0;
let countdownInterval;
let isRunning = false;
let isFullscreen = false;
let lastTranslateY = 0; // 마지막으로 설정된 Y 위치 저장 변수

// 타이머 초기화 함수
function initializeTimer() {
    hoursDisplay.textContent = formatTime(0);
    minutesDisplay.textContent = formatTime(0);
    secondsDisplay.textContent = formatTime(0);
    fsHoursDisplay.textContent = formatTime(0);
    fsMinutesDisplay.textContent = formatTime(0);
    fsSecondsDisplay.textContent = formatTime(0);
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
        
        // 풀스크린 모드 재생/일시정지 버튼 업데이트
        fsPlayPauseIcon.className = 'fa-solid fa-play';
        
        // 타이머가 끝났을 때 알림 표시
        alert('타이머가 종료되었습니다!');
        return;
    }
    
    totalSeconds--;
    
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    // 일반 타이머 디스플레이 업데이트
    hoursDisplay.textContent = formatTime(hours);
    minutesDisplay.textContent = formatTime(minutes);
    secondsDisplay.textContent = formatTime(seconds);
    
    // 풀스크린 타이머 디스플레이 업데이트
    fsHoursDisplay.textContent = formatTime(hours);
    fsMinutesDisplay.textContent = formatTime(minutes);
    fsSecondsDisplay.textContent = formatTime(seconds);
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
        
        // 풀스크린 디스플레이 초기 설정
        fsHoursDisplay.textContent = formatTime(hours);
        fsMinutesDisplay.textContent = formatTime(minutes);
        fsSecondsDisplay.textContent = formatTime(seconds);
    }
    
    isRunning = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    
    // 풀스크린 모드 재생/일시정지 버튼 업데이트
    fsPlayPauseIcon.className = 'fa-solid fa-pause';
    
    countdownInterval = setInterval(updateCountdown, 1000);
}

// 타이머 일시정지 함수
function pauseTimer() {
    if (!isRunning) return;
    
    clearInterval(countdownInterval);
    isRunning = false;
    
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    
    // 풀스크린 모드 재생/일시정지 버튼 업데이트
    fsPlayPauseIcon.className = 'fa-solid fa-play';
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
    
    // 풀스크린 모드 재생/일시정지 버튼 업데이트
    fsPlayPauseIcon.className = 'fa-solid fa-play';
}

// 타이틀 업데이트 함수
function updateTitle() {
    const newTitle = customTitleInput.value.trim();
    if (newTitle) {
        timerTitle.textContent = newTitle;
        fullscreenTitle.textContent = newTitle;
        document.title = newTitle; // 페이지 타이틀도 변경
    } else {
        alert('제목을 입력해주세요.');
    }
}

// 테마 토글 함수
function toggleTheme() {
    if (body.classList.contains('theme-light')) {
        // 라이트 모드 -> 다크 모드
        body.classList.remove('theme-light');
        body.classList.add('theme-dark');
        
        // 풀스크린 컨테이너 테마도 변경
        fullscreenContainer.classList.remove('theme-light');
        fullscreenContainer.classList.add('theme-dark');
        
        themeToggleBtn.textContent = '라이트 모드';
    } else {
        // 다크 모드 -> 라이트 모드
        body.classList.remove('theme-dark');
        body.classList.add('theme-light');
        
        // 풀스크린 컨테이너 테마도 변경
        fullscreenContainer.classList.remove('theme-dark');
        fullscreenContainer.classList.add('theme-light');
        
        themeToggleBtn.textContent = '다크 모드';
    }
}

// 풀스크린 모드에서 재생/일시정지 토글 함수
function togglePlayPause() {
    if (isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
}

// 풀스크린 모드 활성화 함수
function enterFullscreen() {
    isFullscreen = true;
    body.classList.add('fullscreen-active');
    
    // 풀스크린 모드에서도 테마 유지
    if (body.classList.contains('theme-dark')) {
        fullscreenContainer.classList.add('theme-dark');
    } else {
        fullscreenContainer.classList.add('theme-light');
    }
    
    // 현재 타이머 시간 및 타이틀 동기화
    fullscreenTitle.textContent = timerTitle.textContent;
    fsHoursDisplay.textContent = hoursDisplay.textContent;
    fsMinutesDisplay.textContent = minutesDisplay.textContent;
    fsSecondsDisplay.textContent = secondsDisplay.textContent;
    
    // 재생/일시정지 버튼 상태 동기화
    if (isRunning) {
        fsPlayPauseIcon.className = 'fa-solid fa-pause';
    } else {
        fsPlayPauseIcon.className = 'fa-solid fa-play';
    }
    
    // 마지막 저장된 위치 복원
    setTimeout(() => {
        fullscreenContent.style.transform = `translateY(${lastTranslateY}px)`;
    }, 100);
    
    // 실제 브라우저 풀스크린 API 사용 (선택적)
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.webkitRequestFullscreen) { /* Safari */
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { /* IE11 */
        document.documentElement.msRequestFullscreen();
    }
}

// 풀스크린 모드 종료 함수
function exitFullscreen() {
    isFullscreen = false;
    body.classList.remove('fullscreen-active');
    
    // 실제 브라우저 풀스크린 종료 (선택적)
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}

// 드래그 기능 구현
let isDragging = false;
let startY = 0;
let startTranslateY = 0;

// 드래그 시작 함수
function handleDragStart(e) {
    isDragging = true;
    
    // 터치 이벤트인지 마우스 이벤트인지 확인
    const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
    startY = clientY;
    
    // 현재 컨텐츠의 translateY 값 추출
    const transformStyle = window.getComputedStyle(fullscreenContent).transform;
    
    if (transformStyle && transformStyle !== 'none') {
        const matrix = transformStyle.match(/^matrix\((.+)\)$/);
        if (matrix) {
            const values = matrix[1].split(', ');
            startTranslateY = parseFloat(values[5]) || 0;
        }
    } else {
        startTranslateY = 0;
    }
    
    // 드래그 이벤트 리스너 추가
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('touchmove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchend', handleDragEnd);
    
    // 드래그 중일 때는 기본 동작 방지
    e.preventDefault();
}

// 드래그 중 함수
function handleDragMove(e) {
    if (!isDragging) return;
    
    // 터치 이벤트인지 마우스 이벤트인지 확인
    const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
    const deltaY = clientY - startY;
    
    // 화면 높이의 특정 비율(40%)까지만 이동 제한
    const maxTranslateY = window.innerHeight * 0.4;
    
    // 이동 제한 적용
    let newTranslateY = startTranslateY + deltaY;
    newTranslateY = Math.max(-maxTranslateY, Math.min(newTranslateY, maxTranslateY));
    
    // 위치 업데이트
    fullscreenContent.style.transform = `translateY(${newTranslateY}px)`;
}

// 드래그 종료 함수
function handleDragEnd() {
    isDragging = false;
    
    // 마지막 위치 저장
    const transformStyle = window.getComputedStyle(fullscreenContent).transform;
    if (transformStyle && transformStyle !== 'none') {
        const matrix = transformStyle.match(/^matrix\((.+)\)$/);
        if (matrix) {
            const values = matrix[1].split(', ');
            lastTranslateY = parseFloat(values[5]) || 0;
        }
    }
    
    // 이벤트 리스너 제거
    document.removeEventListener('mousemove', handleDragMove);
    document.removeEventListener('touchmove', handleDragMove);
    document.removeEventListener('mouseup', handleDragEnd);
    document.removeEventListener('touchend', handleDragEnd);
}

// 이벤트 리스너
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
updateTitleBtn.addEventListener('click', updateTitle);
themeToggleBtn.addEventListener('click', toggleTheme);
fullscreenBtn.addEventListener('click', enterFullscreen);
exitFullscreenBtn.addEventListener('click', exitFullscreen);
fsPlayPauseBtn.addEventListener('click', togglePlayPause);

// 드래그 핸들 이벤트 리스너
dragHandle.addEventListener('mousedown', handleDragStart);
dragHandle.addEventListener('touchstart', handleDragStart);

// ESC 키를 누르면 풀스크린 모드 종료
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isFullscreen) {
        exitFullscreen();
    }
});

// 브라우저 풀스크린 이벤트 리스너 (선택적)
document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('mozfullscreenchange', handleFullscreenChange);
document.addEventListener('MSFullscreenChange', handleFullscreenChange);

function handleFullscreenChange() {
    // 브라우저 풀스크린이 종료되면 앱의 풀스크린 모드도 종료
    if (!document.fullscreenElement && 
        !document.webkitFullscreenElement && 
        !document.mozFullScreenElement && 
        !document.msFullscreenElement) {
        if (isFullscreen) {
            exitFullscreen();
        }
    }
}

// 초기화
initializeTimer(); 