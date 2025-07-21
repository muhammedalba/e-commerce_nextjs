
export async function loadMessages(locale: string) {
  const modules = await Promise.all([
    import(`./${locale}/routes.json`),
    import(`./${locale}/Auth.json`),
    import(`./${locale}/Brands.json`),
    import(`./${locale}/Categories.json`),
    import(`./${locale}/HomePage.json`),
    import(`./${locale}/Validation.json`),
  ]);
   
  return {
    routes: modules[0].default,
    Auth: modules[1].default,
    Brands: modules[2].default,
    Categories: modules[3].default,
    HomePage: modules[4].default,
    Validation: modules[5].default,
  };}

