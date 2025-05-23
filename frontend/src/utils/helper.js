import moment from "moment";

export const validateEmail  = (email)=>{
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
    
}


export const getInitials = (name)=>{
if (!name) return;

const words = name.split(" ")

let initials = "";

for(let i=0;i<Math.min(words.length,2);i++){
        initials += words[i][0]
}

return initials.toUpperCase();
}


export const addThousandsSeperator = (num)=>{
    if(num ==  null || isNaN(num)) return "";

    const [integralPart, fractionalPart] = num.toString().split('.');
    const formatedInteger = integralPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    return fractionalPart ? `${formatedInteger}.${fractionalPart}`:formatedInteger;
};



export const prepareExpenseChartData = (data = [])=>{


    const chartData = data.map((item)=>({
        category:item?.source,
        amount:item?.amount,
    }));

    return chartData;

}



export const prepareIncomeBarChartData = (data = [])=>{
    const sortedData = [...data].sort((a,b)=> (new Date(a.date) - new Date(b.date)))
    const chartData  = sortedData.map((item)=>({
        month:moment(item?.date).format('Do MMM'),
        amount:item?.amount,
        source:item?.source 
    }))

    return chartData;

}


export const prepareExpenseLineChartData = (data = [])=>{
    const sortedData = [...data].sort((a,b)=> (new Date(a.date) - new Date(b.date)))
    const chartData  = sortedData.map((item)=>({
        month:moment(item?.date).format('Do MMM'),
        amount:item?.amount,
        source:item?.source 
    }))

    return chartData;

}