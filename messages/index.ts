export async function loadMessages(locale: string) {
  const modules = await Promise.all([
    import(`./${locale}/routes.json`),
    import(`./${locale}/Auth.json`),
    import(`./${locale}/Brands.json`),
    import(`./${locale}/Categories.json`),
    import(`./${locale}/Products.json`),
    import(`./${locale}/Supplier.json`),
    import(`./${locale}/SupCategories.json`),
  ]);

  return {
    routes: modules[0].default,
    Auth: modules[1].default,
    Brands: modules[2].default,
    Categories: modules[3].default,
    Products: modules[4].default,
    Supplier: modules[5].default,
    SupCategories: modules[6].default,
  };
}
