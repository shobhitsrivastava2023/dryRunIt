import React from 'react'

const ShowVariable = ({ variables }: { variables: string[] }) => {
  const showvariables = variables
  return (
    <div className="bg-slate-800 p-4 rounded-lg ml-2 mt-2 mr-3 text-white w-[20vw]">
    <h3 className="text-lg font-semibold">Detected Variables:</h3>
    <ul>
      {variables.length > 0 ? (
        variables.map((variable, index) => <li key={index}>{variable}</li>)
      ) : (
        <p>No variables detected yet.</p>
      )}
    </ul>
  </div>
  )
}

export default ShowVariable
