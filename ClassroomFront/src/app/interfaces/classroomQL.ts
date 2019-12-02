import gql from 'graphql-tag';
export interface ClassroomQL{
    getAllClassroom: any;
}
const getClassroom = gql`
    {
      getAllClassroom{
        number
        building
      }
    }
  `;

