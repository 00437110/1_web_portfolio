import { workoutProgram as training_plan } from '../utils/index.js'
import WorkoutCard from './WorkoutCard.jsx'
import { useState, useEffect } from "react"

export default function Grid() {

    const [savedWorkouts, setSavedWorkouts] = useState(null)
    const [selectedWorkout, setSelectedWorkout] = useState(null)

    const completedWorkouts = Object.keys(savedWorkouts || {}).filter((val) => {
        const entry = savedWorkouts[val]
        return entry.isComplete
    })
    //en savedWorkouts, si los hay, buscará iterativamente todos los valores de los ejerciicos hechos, y buscará si está completo o no. 
    //Así que si irá val 0, de savedWorkouts[0] buscará si esta completo o no y lo guardará en el índice 0 del array completed workouts

    function handleSave(index, data) {
        //save to local storage and modify the saved workouts state
        const newObj = {
            ...savedWorkouts,
            [index]: {
                ...data,
                isComplete: !!data.isComplete || !!savedWorkouts?.[index]?.isComplete
                //double not which forces a true or false statement
                //?. is a optional chaining sintax,
            }// we will spread data to duplicate with an object
        }

        setSavedWorkouts(newObj)
        localStorage.setItem('brogram', JSON.stringify(newObj)) // we save in localStorage the item, and with a local key
        setSelectedWorkout(null)
    }

    function handleComplete(index, data) {
        // complete workout ( modofiy the completed status)

        const newObj = { ...data }
        newObj.isComplete = true //this means it has been complete
        handleSave(index, newObj)

    }

    useEffect(() => { //in case there's nothing saved
        if (!localStorage) { return }
        let savedData = {} //let allows us to overwrite it
        if (localStorage.getItem('brogram')) {// if there is any data here, it will comeback true
            savedData = JSON.parse(localStorage.getItem('brogram'))

        }
        setSavedWorkouts(savedData)

    }, [])


    return (
        <div className="training-plan-grid">
            {Object.keys(training_plan).map((workout, workoutIndex) => {
                const isLocked = workoutIndex === 0 ?
                    false :
                    !completedWorkouts.includes(`${workoutIndex - 1}`) // por que las comillas, signo de dolar y llaves son necesarios solo aqui?
                    //lee cada valor de si h completado o no los ejercicos. En día 1 es especial y ese siempre está desbloqueado, por eso locked false
                    //en día 2 en adelante lee si el día anterior está completado o ono, y si está completado, es true. Pero para que abra, el locked debe ser false, por eso se cambia de lógica

                const type = workoutIndex % 3 === 0 ?
                    'Push' :
                    workoutIndex % 3 === 1 ?
                        'Pull' :
                        'Legs'

                const trainingPlan = training_plan[workoutIndex]
                const dayNum = ((workoutIndex / 8) <= 1) ? '0' + (workoutIndex + 1) : workoutIndex + 1
                const icon = workoutIndex % 3 === 0 ? (
                    <i className='fa-solid fa-dumbbell'></i>
                ) : (
                    workoutIndex % 3 === 1 ? (
                        <i className='fa-solid fa-weight-hanging'></i>
                    ) : (
                        <i className='fa-solid fa-bolt'></i>
                    )
                )

                if (workoutIndex === selectedWorkout) {
                    return (
                        <WorkoutCard savedWeights={savedWorkouts?.[workoutIndex]?.weights}
                            handleSave={handleSave} handleComplete={handleComplete}
                            key={workoutIndex} trainingPlan={trainingPlan} type={type}
                            workoutIndex={workoutIndex} icon={icon} dayNum={dayNum} />

                    )
                }

                return (
                    <button onClick={() => {
                        if (isLocked) { return }
                        setSelectedWorkout(workoutIndex)
                    }}


                        className={'card plan-card ' + (isLocked ? 'inactive' : '')} key={workoutIndex}>
                        <div className='plan-card-header'>
                            <p>Day {dayNum}</p>
                        </div>
                        {isLocked ? (
                            <i className='fa-solid fa-lock'></i>
                        ) : (icon)}
                        <div className='plan-card-header'>
                            <h4><b>{type}</b></h4>
                        </div>


                    </button>
                )

            })}


        </div>
    )
}