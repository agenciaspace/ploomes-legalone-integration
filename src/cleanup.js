#!/usr/bin/env node

/**
 * Cleanup Tool - Limpar dados de teste do Ploomes
 * 
 * Execute: node src/cleanup.js
 */

require('dotenv').config();
const PloomesClient = require('./ploomesClient');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ploomesClient = new PloomesClient(
  process.env.PLOOMES_API_KEY,
  process.env.PLOOMES_API_URL
);

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function deleteContact(contactId) {
  try {
    console.log(`\n🗑️  Deletando contato ${contactId}...`);
    
    const response = await fetch(`${ploomesClient.apiUrl}/Contacts(${contactId})`, {
      method: 'DELETE',
      headers: { 'User-Key': ploomesClient.apiKey }
    });

    if (response.ok || response.status === 204) {
      console.log('✅ Contato deletado com sucesso!');
      return true;
    } else {
      console.log(`❌ Erro ao deletar: ${response.status} ${response.statusText}`);
      return false;
    }
  } catch (error) {
    console.error('❌ Erro:', error.message);
    return false;
  }
}

async function deleteDeal(dealId) {
  try {
    console.log(`\n🗑️  Deletando oportunidade ${dealId}...`);
    
    const response = await fetch(`${ploomesClient.apiUrl}/Deals(${dealId})`, {
      method: 'DELETE',
      headers: { 'User-Key': ploomesClient.apiKey }
    });

    if (response.ok || response.status === 204) {
      console.log('✅ Oportunidade deletada com sucesso!');
      return true;
    } else {
      console.log(`❌ Erro ao deletar: ${response.status} ${response.statusText}`);
      return false;
    }
  } catch (error) {
    console.error('❌ Erro:', error.message);
    return false;
  }
}

async function searchTestContacts() {
  try {
    console.log('\n🔍 Buscando contatos de teste...');
    
    // Buscar contatos que contenham "Teste" no nome
    const response = await fetch(
      `${ploomesClient.apiUrl}/Contacts?$filter=contains(Name,'Teste')&$select=Id,Name,CreateDate&$top=20`,
      {
        headers: { 'User-Key': ploomesClient.apiKey }
      }
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    const contacts = data.value || [];

    if (contacts.length === 0) {
      console.log('📭 Nenhum contato de teste encontrado.');
      return [];
    }

    console.log(`\n📋 Encontrados ${contacts.length} contatos de teste:\n`);
    contacts.forEach((contact, index) => {
      const date = new Date(contact.CreateDate).toLocaleString('pt-BR');
      console.log(`  ${index + 1}. ID: ${contact.Id} - ${contact.Name} (Criado: ${date})`);
    });

    return contacts;
  } catch (error) {
    console.error('❌ Erro ao buscar contatos:', error.message);
    return [];
  }
}

async function cleanupInteractive() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║   Ferramenta de Limpeza - Ploomes                         ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  try {
    // Buscar contatos de teste
    const contacts = await searchTestContacts();

    if (contacts.length === 0) {
      console.log('\n✅ Nenhum dado de teste para limpar!\n');
      rl.close();
      return;
    }

    // Confirmar limpeza
    const answer = await question('\n❓ Deseja deletar TODOS estes contatos de teste? (s/N): ');

    if (answer.toLowerCase() !== 's' && answer.toLowerCase() !== 'sim') {
      console.log('\n❌ Operação cancelada.\n');
      rl.close();
      return;
    }

    console.log('\n🚀 Iniciando limpeza...');

    let deleted = 0;
    let failed = 0;

    for (const contact of contacts) {
      const success = await deleteContact(contact.Id);
      if (success) {
        deleted++;
      } else {
        failed++;
      }
      
      // Pequeno delay para não sobrecarregar a API
      await new Promise(r => setTimeout(r, 200));
    }

    console.log('\n' + '═'.repeat(60));
    console.log('📊 Resumo da Limpeza:');
    console.log(`  ✅ Deletados: ${deleted}`);
    console.log(`  ❌ Falhas: ${failed}`);
    console.log(`  📝 Total: ${contacts.length}`);
    console.log('═'.repeat(60) + '\n');

    if (deleted > 0) {
      console.log('✅ Limpeza concluída com sucesso!\n');
    }

  } catch (error) {
    console.error('\n❌ Erro durante limpeza:', error.message);
  } finally {
    rl.close();
  }
}

async function cleanupSpecific() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║   Limpeza Específica - Ploomes                            ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('❌ Erro: Especifique os IDs para deletar\n');
    console.log('Uso:');
    console.log('  node src/cleanup.js <contactId> [dealId]\n');
    console.log('Exemplos:');
    console.log('  node src/cleanup.js 605097537');
    console.log('  node src/cleanup.js 605097537 12345\n');
    rl.close();
    return;
  }

  const contactId = args[0];
  const dealId = args[1];

  let results = { contact: false, deal: false };

  // Deletar deal primeiro (se especificado)
  if (dealId) {
    results.deal = await deleteDeal(dealId);
  }

  // Deletar contato
  results.contact = await deleteContact(contactId);

  console.log('\n' + '═'.repeat(60));
  if (results.contact || results.deal) {
    console.log('✅ Limpeza concluída!\n');
  } else {
    console.log('❌ Nenhum item foi deletado.\n');
  }

  rl.close();
}

async function main() {
  if (!process.env.PLOOMES_API_KEY) {
    console.error('\n❌ ERRO: PLOOMES_API_KEY não configurada');
    console.error('Configure no arquivo .env e tente novamente\n');
    process.exit(1);
  }

  const args = process.argv.slice(2);

  if (args.length === 0) {
    // Modo interativo - busca e limpa contatos de teste
    await cleanupInteractive();
  } else if (args[0] === '--help' || args[0] === '-h') {
    console.log(`
Ferramenta de Limpeza - Ploomes

Uso:
  node src/cleanup.js                    # Modo interativo (busca contatos de teste)
  node src/cleanup.js <contactId>        # Deletar contato específico
  node src/cleanup.js <contactId> <dealId>   # Deletar contato e oportunidade

Exemplos:
  node src/cleanup.js                    # Busca e limpa todos contatos de teste
  node src/cleanup.js 605097537          # Deleta contato específico
  node src/cleanup.js 605097537 12345    # Deleta contato e oportunidade
`);
  } else {
    // Modo específico - deleta IDs fornecidos
    await cleanupSpecific();
  }
}

// Executar
if (require.main === module) {
  main().catch(error => {
    console.error('Erro fatal:', error);
    process.exit(1);
  });
}

module.exports = { deleteContact, deleteDeal, searchTestContacts };
