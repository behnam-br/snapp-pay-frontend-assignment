import z from 'zod';

////
//// filter
////
export const FilterItemSchema = z.object({
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
});

export type FilterItem = z.infer<typeof FilterItemSchema>;

type FilterSchemaMapShape<Keys extends readonly string[]> = {
  [K in Keys[number]]: z.ZodOptional<typeof FilterItemSchema>;
};

export function createFilterMapSchema<const Keys extends readonly string[]>(keys: Keys) {
  const shape = keys.reduce((acc, key) => {
    acc[key as keyof FilterSchemaMapShape<Keys>] = FilterItemSchema.optional();
    return acc;
  }, {} as FilterSchemaMapShape<Keys>);

  return z.object(shape).strict();
}

export type FilterMap<Keys extends readonly string[]> = {
  [K in Keys[number]]?: FilterItem | undefined;
};

////
////  meta
////

export function createPaginatedMetaSchema<const Keys extends readonly string[]>(keys: Keys) {
  const criteriaSchema = createFilterMapSchema(keys);
  return z.object({
    skipped: z.number(),
    limit: z.number(),
    total: z.number(),
    criteria: criteriaSchema,
  });
}

type PaginatedMetaWithoutCriteria = Pick<
  z.infer<ReturnType<typeof createPaginatedMetaSchema>>,
  'skipped' | 'limit' | 'total'
>;

export type PaginatedMeta<Keys extends readonly string[]> = PaginatedMetaWithoutCriteria & {
  criteria: FilterMap<Keys>;
};

////
//// paginated
////

export function createPaginatedSchema<
  Item extends z.ZodTypeAny,
  const Keys extends readonly string[],
>(itemSchema: Item, keys: Keys) {
  const metaSchema = createPaginatedMetaSchema(keys);
  return z.object({
    meta: metaSchema,
    items: z.array(itemSchema),
  });
}

type PaginatedWithoutMeta<Item = unknown> = {
  [K in keyof Pick<z.infer<ReturnType<typeof createPaginatedSchema>>, 'items'>]: Item[];
};

export type Paginated<
  Keys extends readonly string[],
  Item = unknown,
> = PaginatedWithoutMeta<Item> & {
  meta: PaginatedMeta<Keys>;
};

////
//// param
////

export function createPaginatedParamSchema<const Keys extends readonly string[]>(keys: Keys) {
  const whereSchema = createFilterMapSchema(keys);
  return z.object({
    sort: z.number().optional(),
    page: z.number().optional(),
    limit: z.number().optional(),
    where: whereSchema.optional(),
  });
}

type PaginatedParamWithoutWhere = Pick<
  z.infer<ReturnType<typeof createPaginatedParamSchema>>,
  'sort' | 'page' | 'limit'
>;

export type PaginatedParam<Keys extends readonly string[]> = PaginatedParamWithoutWhere & {
  where?: FilterMap<Keys>;
};
