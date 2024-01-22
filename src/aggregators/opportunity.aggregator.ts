import Opportunity from "../models/opportunity.model";
import { ObjectId } from "mongodb";
import { STATUS } from "../enum";

export const fetchListOfOpportunities = async () => {
  const opportunities = await Opportunity.aggregate([
    {
      $match: { status: { $ne: STATUS.DRAFT } },
    },
    {
      $lookup: {
        from: "organizations",
        localField: "orgId",
        foreignField: "orgId",
        as: "organization",
      },
    },
    {
      $unwind: "$organization",
    },
    {
      $project: {
        _id: 0,
        oppId: "$_id",
        title: 1,
        status: 1,
        certificateProvided: 1,
        organizationName: "$organization.name",
      },
    },
  ]);

  return opportunities;
};

export const viewOpportunity = async (oppid) => {
  const opportunity = await Opportunity.aggregate([
    {
      $match: { _id: new ObjectId(oppid) },
    },
    {
      $match: { status: { $ne: STATUS.DRAFT } },
    },
    {
      $lookup: {
        from: "organizations",
        localField: "orgId",
        foreignField: "orgId",
        as: "organization",
      },
    },
    {
      $unwind: "$organization",
    },
    {
      $project: {
        _id: 0,
        oppId: "$_id",
        title: 1,
        status: 1,
        certificateProvided: 1,
        description: 1,
        venue: 1,
        startingDate: 1,
        startingTime: 1,
        durationInDays: 1,
        hoursPerDay: 1,
        volunteerCapacity: 1,
        deadline: 1,
        otherDetails: 1,
        category: 1,
        contactPersonName: 1,
        contactPersonEmail: 1,
        contactPersonDesignation: 1,
        updatedAt: 1,
        organizationName: "$organization.name",
        organizationCountry: "$organization.country",
        organizationPhone: "$organization.phone",
        organizationAddress: "$organization.address",
        orgId: "$organization.orgId",
      },
    },
    {
      $limit: 1,
    },
  ]);

  return opportunity;
};
