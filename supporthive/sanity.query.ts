import {client} from './sanity.cli'
const userQuery = `*[_type == "user" && uid == $uid][0] {
    _id,
    uid,
    firstname,
    lastname,
    email,
    emailVerified,
  }`

// Get user Details
export const getUserDetails = async (uid: string) => {
  const params = {uid}
  const user = await client.fetch(userQuery, params)
  return user
}

export const fetchAllCampaigns = async () => {
  const query = `*[_type == "campaign"]{
    _id,
    title,
    country,
    city,
    category,
    description,
    goalAmount,
    startDate,
    endDate,
    raiseMoneyFor,
    importance,
    impact,
    status,
    createdBy->{
      _id,
      firstname,
      lastname,
      email
    }
  }`

  try {
    const campaigns = await client.fetch(query)
    return campaigns
  } catch (error) {
    console.error('Error fetching campaigns:', error)
    return []
  }
}
