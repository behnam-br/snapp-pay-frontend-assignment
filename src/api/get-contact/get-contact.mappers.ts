import { ContactDto } from '@/api/get-contact/get-contact.schemas';
import { Contact } from '@/api/get-contact/get-contact.types';

export function mapContact(dto: ContactDto): Contact {
  const fullName = `${dto.first_name} ${dto.last_name}`.trim();

  return {
    id: dto.id,
    firstName: dto.first_name,
    lastName: dto.last_name,
    fullName,
    phone: dto.phone,
    gender: dto.gender,
    email: dto.email ?? null,
    note: dto.note ?? null,
    telegram: dto.telegram ?? null,
    avatar: dto.avatar ?? null,
    company: dto.company ?? null,
    address: dto.address ?? null,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  };
}
