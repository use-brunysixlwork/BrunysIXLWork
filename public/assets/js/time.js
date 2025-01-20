function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    let ampm = hours >= 12 ? 'PM' : 'AM';
    
    
    hours = hours % 12;
    hours = hours ? String(hours).padStart(2, '0') : '12'; 
    
    const currentTime = `${hours}:${minutes}:${seconds} ${ampm}`;
    document.getElementById("timeDisplay").textContent = currentTime;
}

setInterval(updateTime, 1000);
updateTime();
