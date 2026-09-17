# Plataforma de lojas digitais

Uma plataforma **Company → Stores**. A empresa (Núcleo, editável em `/admin/company`) administra várias marcas. A **Semeia** é a primeira loja (nicho cristão), não a empresa.

O catálogo e a vitrine rodam neste projeto; o pagamento é feito na Kiwify.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- PostgreSQL + Prisma

## Como rodar

1. Copie `.env.example` para `.env` e ajuste as variáveis.
2. Crie um banco PostgreSQL. Se usar Docker:

```bash
docker compose up -d
```

No Windows, com PostgreSQL local, ajuste `DATABASE_URL` para o usuário e a senha da sua instalação e crie o banco `semeia`.

3. Aplique a migration, gere o client e popule os exemplos:

```bash
npx prisma migrate dev
npm run db:seed
```

4. Inicie a loja:

```bash
npm run dev
```

- Empresa: http://localhost:3000
- Semeia: http://localhost:3000/loja/semeia
- Finanças: http://localhost:3000/loja/financas
- Fitness: http://localhost:3000/loja/fitness
- Catálogo da Semeia (compatível): http://localhost:3000/produtos
- Oferta (exemplo): http://localhost:3000/loja/semeia/oferta/ainda-assim-espero
- Admin / empresa: http://localhost:3000/admin/company
- Admin / lojas: http://localhost:3000/admin/stores

Credenciais iniciais vêm de `ADMIN_EMAIL` e `ADMIN_PASSWORD` no `.env`.

## Kiwify

Cada produto tem o próprio `kiwifyCheckoutUrl`. O botão **Comprar agora** envia o cliente para esse checkout.

O endpoint `POST /api/webhooks/kiwify` já persiste cliente, pedido e pagamento. A assinatura e o mapeamento de campos são placeholders: configure `KIWIFY_WEBHOOK_SECRET` e ajuste `src/lib/kiwify/` quando a documentação oficial estiver disponível. Nenhum dado de cartão é armazenado.

Enquanto o PostgreSQL não estiver acessível, a vitrine usa o catálogo de exemplo em `src/lib/content/catalog.ts`. Criar, editar e registrar vendas exige o banco.
