
export async function loadMessages(locale: string) {
  const modules = await Promise.all([
    import(`./${locale}/routes.json`),
    import(`./${locale}/Auth.json`),
    import(`./${locale}/HomePage.json`),
  ]);
   
  return {
    routes: modules[0].default,
    Auth: modules[1].default,
    HomePage: modules[2].default,
  };}

