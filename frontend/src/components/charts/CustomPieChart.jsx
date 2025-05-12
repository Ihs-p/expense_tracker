// import React from 'react'

// import {
//     PieChart,
//     Pie,
//     Cell,
//     Tooltip,
//     ResponsiveContainer,
//     Legend,
// }
// from 'recharts'
// import CustomLegend from './CustomLegend'
// import CustomToolTip from './CustomToolTip'

// const CustomPieChart = ({data,label,totalAmount,colors,showTextAnchor}) => {

//     console.log(showTextAnchor)
//   return (
//     <ResponsiveContainer width="100%"
//     height={380}>
        
   
//     <PieChart >
//        <Pie
//     data = {data}
//     dataKey="amount"
//     nameKey="name"
//     cx="50%"
//     cy="50%"
//     outerRadius={130}
//     innerRadius={100}
//     labelLine={false}
//     >
//         {
//             data?.map((entry,index)=>(
//                 <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
//             ))
//         }
//         </Pie> 


//         <Tooltip  content={<CustomToolTip/>}/>
//         <Legend content={<CustomLegend/>}/>


//         {
//             showTextAnchor && (
//                 <>
//                 <text 
//                     x="50%"
//                     y="50%"
//                     dy={-25}
//                     textAnchor="middle"
//                     fill="#666"
//                     fontSize="14px"
//                     >
//                         {label}
//                     </text>

//                     <text
//                     x="50%"
//                     y="50%"
//                     dy={8}
//                     textAnchor='middle'
//                     fill="#333"
//                     fontSize="24px"
//                     fontWeight="semi-bold"
//                     >
//                         {totalAmount}
//                     </text>
//                 </>
//             )
//         }
//     </PieChart>
   
//     </ResponsiveContainer> 
     
//   )
// }

// export default CustomPieChart



import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Label,
} from 'recharts';
import CustomLegend from './CustomLegend';
import CustomToolTip from './CustomToolTip';

const CustomPieChart = ({ data, label, totalAmount, colors, showTextAnchor }) => {
  return (
    <div className="relative w-full h-[380px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={130}
            innerRadius={100}
            labelLine={false}
          >
            {data?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomToolTip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>

      {showTextAnchor && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-xl font-semibold text-gray-800">{totalAmount}</p>
        </div>
      )}
    </div>
  );
};

export default CustomPieChart;
