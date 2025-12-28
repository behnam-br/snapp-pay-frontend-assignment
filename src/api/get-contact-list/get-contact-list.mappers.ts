import { mapContact } from '@/api/get-contact/get-contact.mappers';
import {
  ContactListDto,
  ContactListParamDto,
} from '@/api/get-contact-list/get-contact-list.schemas';
import {
  ContactList,
  ContactListCriteriaKeys,
  ContactListParam,
  ContactListParamKeys,
} from '@/api/get-contact-list/get-contact-list.types';
import { FilterMap } from '@/lib/axios/utils/paginated.schemas';

export function mapContactList(dto: ContactListDto): ContactList {
  return {
    items: dto.items.map(mapContact),
    meta: { ...dto.meta, criteria: mapContactListCriteria(dto) },
  };
}

export function mapContactListCriteria(dto: ContactListDto): FilterMap<ContactListCriteriaKeys> {
  const criteria: FilterMap<ContactListCriteriaKeys> = {};
  if (dto.meta.criteria.first_name) {
    criteria.firstName = dto.meta.criteria.first_name;
  }
  if (dto.meta.criteria.last_name) {
    criteria.lastName = dto.meta.criteria.last_name;
  }
  if (dto.meta.criteria.phone) {
    criteria.phone = dto.meta.criteria.phone;
  }
  return criteria;
}

export function mapContactListParam(dto: ContactListParamDto): ContactListParam {
  const param: ContactListParam = {};
  if (dto.page) {
    param.page = dto.page;
  }
  if (dto.limit) {
    param.limit = dto.limit;
  }
  if (dto.sort) {
    param.sort = dto.sort;
  }
  if (dto.where) {
    param.where = mapContactListParamCriteria(dto);
  }
  return param;
}

export function mapContactListParamCriteria(
  dto: ContactListParamDto
): FilterMap<ContactListParamKeys> {
  const where: FilterMap<ContactListParamKeys> = {};
  if (dto.where) {
    if (dto.where.firstName) {
      where.last_name = dto.where.firstName;
    }
    if (dto.where.lastName) {
      where.first_name = dto.where.lastName;
    }
    if (dto.where.phone) {
      where.phone = dto.where.phone;
    }
  }
  return where;
}
