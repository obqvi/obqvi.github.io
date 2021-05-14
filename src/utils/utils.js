export const calcTimes = (timestamp) => {
    let minutes = (new Date(new Date().getTime() - new Date(timestamp).getTime())).getTime() / 1000 / 60;
    let hours = minutes / 60;
    let days = minutes / 60 / 24;
    
    if (hours >= 1) {
        return (minutes / 60).toFixed(0) + ' часа';
    }

    if(days >= 1) {
        return (minutes / 24).toFixed() + ' дни';
    }

    if(minutes < 1) {
        return 'току що';
    }

    return minutes.toFixed(0) + ' минути';
}