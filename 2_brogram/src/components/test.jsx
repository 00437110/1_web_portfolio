import { useState, useEffect } from 'react'
import { workoutProgram as training_plan } from '../utils/index.js'
import WorkoutCard from './WorkoutCard.jsx'

export default function Grid() {

    return (
        <div className="training-plan-grid">
            {Object.keys(training_plan).map((workout, workoutIndex) => {
                
                return (
                    <button onClick={() => {
                        if (isLocked) { return }
                        setSelectedWorkout(workoutIndex)
                    }} className={'card plan-card  ' + (isLocked ? 'inactive' : '')} key={workoutIndex}>
                        <div className='plan-card-header'>
                            <p>Day {dayNum}</p>
                            {isLocked ? (
                                <i className='fa-solid fa-lock'></i>
                            ) : (icon)}
                        </div>

                        <div className='plan-card-header'>
                            <h4><b>{type}</b></h4>
                        </div>
                    </button>
                )
            })}
        </div>
    )
}