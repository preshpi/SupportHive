import {client} from './sanity.cli'
import {toast} from 'sonner'

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
    subAccountId,
    bank,
    accountNumber,
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
    toast.error((error as {message: string}).message)
    return []
  }
}

export const fetchApprovedCampaigns = async () => {
  const query = `*[_type == "campaign" && status == "approved"]{
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
    subAccountId,
    status,
    createdBy->{
      _id,
      name, 
      email
    }
  }`

  try {
    const approvedCampaigns = await client.fetch(query)
    return approvedCampaigns
  } catch (error) {
    toast.error((error as {message: string}).message)
    return []
  }
}

export const fetchPendingCampaigns = async () => {
  const query = `*[_type == "campaign" && status == "pending"]{
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
      name, 
      email
    }
  }`

  try {
    const pendingCampaigns = await client.fetch(query)
    return pendingCampaigns
  } catch (error) {
    toast.error((error as {message: string}).message)
    return []
  }
}

export const fetchRejectedCampaigns = async () => {
  const query = `*[_type == "campaign" && status == "rejected"]{
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
      name, 
      email
    }
  }`

  try {
    const rejectedCampaigns = await client.fetch(query)
    return rejectedCampaigns
  } catch (error) {
    toast.error((error as {message: string}).message)
    return []
  }
}

export const fetchCampaignById = async (id: string | undefined) => {
  const query = `*[_type == "campaign" && _id == "${id}"]{
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
    name,
    phone,
    images,
    supportingDocuments,
    subAccountId,
    createdBy->{
      _id,
      email
    }
  }`

  try {
    const campaign = await client.fetch(query)
    return campaign[0] // Return the first (and only) result
  } catch (error) {
    toast.error((error as {message: string}).message)
    return null
  }
}
