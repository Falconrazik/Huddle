export const registerUserGQL = `
mutation registerUser($input: users_insert_input!) {
    insert_users_one(object: $input) {
      bio
      created_at
      dob
      first_name
      email
      gender
      interests
      last_name
      major
      university
      updated_at
      vintage
      member_of
    }
  }
`;

export const createHuddle = `
mutation createHuddle($input:groups_insert_input!) {
  insert_groups_one(object:$input) {
    id
    name
    description
    min
    max
    creator
  }
}
`;

export const getFeedHuddles = `
{
  groups {
    cover_art_key
    creator
    id
    description
    max
    members
    min
    name
  }
}
`;

export const getMeBrief = `
query getMe($email: String!) {
  users(where: {email: {_eq: $email}}) {
    id
    first_name
    last_name
    gender
    interests
    major
    university
    vintage
  }
}
`;

export const getHuddle = `
query getHuddle($id: uuid!) {
  groups(where:{id:{_eq: $id}}) {
    cover_art_key
    creator
    id
    description
    max
    members
    min
    name
  }
}
`;

export const addMeToHuddle = `
mutation addMeToHuddle($newArray:_uuid, $groupId:uuid!) {
  update_groups(where:{id:{_eq:$groupId}}, _set:{members:$newArray}) {
    affected_rows
    returning {
      id
    	name
      description
      members
    }
  }
}
`;