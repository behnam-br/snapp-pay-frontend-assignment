import { mapContact } from '@/api/get-contact/get-contact.mappers';
import { ContactListDto } from '@/api/get-contact-list/get-contact-list.schemas';
import {
  ContactList,
  ContactListParams,
  ContactListParamsDto,
  ContactListWhere,
} from '@/api/get-contact-list/get-contact-list.types';

export function mapContactList(dto: ContactListDto): ContactList {
  const totalCount = dto.meta.total;
  const totalPages = Math.ceil(totalCount / dto.meta.limit);
  const page = dto.meta.skipped / dto.meta.limit + 1;
  return {
    items: dto.items.map(mapContact),
    meta: { totalCount, totalPages, page },
  };
}

export function mapContactListParams(param: ContactListParams): ContactListParamsDto {
  const skip = (param.page - 1) * param.limit;
  const where: ContactListWhere = {};
  if (param.filters.firstName) {
    where.first_name = { contains: param.filters.firstName };
  }
  if (param.filters.lastName) {
    where.last_name = { contains: param.filters.lastName };
  }
  if (param.filters.phone) {
    where.phone = { contains: param.filters.phone };
  }
  return {
    skip,
    limit: param.limit,
    where,
  };
}
