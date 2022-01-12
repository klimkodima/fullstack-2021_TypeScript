import React from 'react';
import CoursePart from '../types';

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

const Part = ({coursePart}: {coursePart: CoursePart}) => {
  switch (coursePart.type) {
    case 'normal':
      return <div>
               <b>{coursePart.name} {coursePart.exerciseCount}</b>
               <p><em>{coursePart.description}</em></p>
            </div>;
      break;
    case 'groupProject':
      return <div>
          <b>{coursePart.name} {coursePart.exerciseCount}</b>
          <p> project execises {coursePart.groupProjectCount}</p>
          </div>;
      break;
    case 'submission':
      return  <div>
               <b>{coursePart.name} {coursePart.exerciseCount}</b>
               <p><em>{coursePart.description}</em></p>
               <p> submit to {coursePart.exerciseSubmissionLink}</p>
              </div>;
      break;
      case 'special':
        return  <div>
                 <b>{coursePart.name} {coursePart.exerciseCount}</b>
                 <p><em>{coursePart.description}</em></p>
                 <p> required skils: {coursePart.requirements.join(', ')}</p>
                </div>;
        break;
    default:
      return assertNever(coursePart);
      break;
  }
}

const Content = ({courseParts}: {courseParts: CoursePart[]}) => {

  return ( 
    <>
      { courseParts.map( coursePart   =>
        <Part key={coursePart.name} coursePart={coursePart}/>
      ) }
    </>
  )
}

export default Content 