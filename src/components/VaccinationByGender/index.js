// Write your code here
// Write your code here
import {PieChart, Pie, Legend, Cell} from 'recharts'

const VaccinationByGender = props => {
  const {thirdDataSend} = props
  return (
    <PieChart width={1000} height={300}>
      <Pie
        cx="50%"
        cy="40%"
        data={thirdDataSend}
        startAngle={180}
        endAngle={0}
        innerRadius="40%"
        outerRadius="70%"
        dataKey="count"
      >
        <Cell name="Male" fill="#f54394" />
        <Cell name="Female" fill="#5a8dee" />
        <Cell name="Others" fill="#2cc6c6" />
      </Pie>
      <Legend
        iconType="circle"
        layout="horizontal"
        verticalAlign="middle"
        align="center"
        wrapperStyle={{fontSize: 12, fontFamily: 'Roboto'}}
      />
    </PieChart>
  )
}

export default VaccinationByGender
