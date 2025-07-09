import { workoutProgram as training_plan } from '../utils/index.js'

export default function Grid() {
    return (
        <div className="training-grid-plan"> 
            {Object.keys(training_plan).map((workout, workoutIndex) => {
                return(
                    <button key={workoutIndex}>
                        <div className='plan-card-header'>
                             <p>Day {((workoutIndex / 8) <= 1 ) ? '0' + (workoutIndex +1) : workoutIndex + 1 }</p>
                        </div>
                    </button>
                )

            })}


        </div>
    )
}