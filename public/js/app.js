window.onload=function(){
    const weatherForm=document.querySelector('form');
    const search=document.querySelector('input');
    const displayer=document.querySelector('#msg');

    weatherForm.addEventListener('submit',(e)=>{
        e.preventDefault();
        displayer.innerHTML="Searching In Progress...";
        const location=search.value;
        getWeatherReport(location,(data)=>{
            if(data.error){
                displayer.innerHTML=`Request couldn't complete. Reason: ${data.error}`;
                return;
            }
            const temperature=data.temperature;
            const feelsLike=data.feelsLike;
            const weatherDesc=data.weatherDesc;
            const location=data.location;
            displayer.innerHTML=`${weatherDesc}. It is currently ${temperature} 
            but really feels like ${feelsLike} in ${location.name}, ${location.region}, ${location.country}. 
            The time is ${location.localtime}`;
            search.value='';
        });
    });

    function getWeatherReport(location,callBackFunction){
        fetch('/getWeatherServices?address='+location).then((coordinates)=>{
            coordinates.json().then((data)=>{
                console.log(data);
                callBackFunction(data);
            });
        });
    }
}