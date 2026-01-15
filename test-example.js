#!/usr/bin/env node

/**
 * Script de Exemplo - Como usar a integração
 * 
 * Execute: node test-example.js
 */

require('dotenv').config();
const { ploomesClient, syncManager } = require('./src/index');

async function exemploUso() {
  console.log('\n🔍 Exemplo de Uso da Integração\n');
  console.log('═'.repeat(60));

  // Exemplo 1: Criar um contato
  console.log('\n📝 Exemplo 1: Criar Contato no Ploomes\n');
  
  try {
    const novoContato = {
      Name: `Cliente Teste - ${new Date().toLocaleTimeString()}`,
      TypeId: 2, // 2 = Empresa
      Email: 'teste@exemplo.com',
      Phones: [{ PhoneNumber: '11999999999', TypeId: 1 }]
    };

    console.log('Criando contato:', novoContato.Name);
    const resultado = await ploomesClient.createContact(novoContato);
    
    // Debug: ver estrutura da resposta
    console.log('\n🔍 Debug - Estrutura da resposta:');
    console.log(JSON.stringify(resultado, null, 2));
    
    // Extrair ID do resultado (tentar diferentes formatos)
    let contatoId;
    if (resultado.value) {
      contatoId = Array.isArray(resultado.value) ? resultado.value[0]?.Id : resultado.value.Id;
    } else {
      contatoId = resultado.Id;
    }
    
    if (!contatoId) {
      throw new Error('Não foi possível extrair o ID do contato criado. Veja a resposta acima.');
    }
    
    console.log('\n✅ Contato criado com sucesso!');
    console.log('📋 ID:', contatoId);
    console.log('🔗 Ver no Ploomes: https://app.ploomes.com/Contacts/' + contatoId);

    // Exemplo 2: Buscar o contato criado
    console.log('\n\n📖 Exemplo 2: Buscar Contato\n');
    console.log('Buscando contato ID:', contatoId);
    
    const contatoBuscado = await ploomesClient.getContact(contatoId);
    const dadosContato = contatoBuscado.value || contatoBuscado;
    
    console.log('✅ Contato encontrado:');
    console.log('   Nome:', dadosContato.Name);
    console.log('   Email:', dadosContato.Email);
    console.log('   Tipo:', dadosContato.TypeId === 2 ? 'Empresa' : 'Pessoa');

    // Exemplo 3: Criar uma oportunidade vinculada
    console.log('\n\n💼 Exemplo 3: Criar Oportunidade Vinculada\n');
    
    const novaOportunidade = {
      Title: `Oportunidade Teste - ${dadosContato.Name}`,
      ContactId: contatoId,
      Amount: 25000.00,
      StatusId: 1 // 1 = Em aberto
    };

    console.log('Criando oportunidade:', novaOportunidade.Title);
    const resultadoDeal = await ploomesClient.createDeal(novaOportunidade);
    
    const dealId = resultadoDeal.value?.Id || resultadoDeal.Id;
    console.log('✅ Oportunidade criada com sucesso!');
    console.log('📋 ID:', dealId);
    console.log('💰 Valor: R$', novaOportunidade.Amount.toLocaleString('pt-BR'));
    console.log('🔗 Ver no Ploomes: https://app.ploomes.com/Deals/' + dealId);

    // Exemplo 4: Sincronizar com Legal One (se configurado)
    console.log('\n\n🔄 Exemplo 4: Sincronizar com Legal One\n');
    
    if (process.env.LEGALONE_API_KEY) {
      console.log('Sincronizando contato...');
      const syncResult = await syncManager.syncContact(contatoId);
      
      if (syncResult.success) {
        console.log('✅ Sincronização bem-sucedida!');
        console.log('   Ploomes ID:', syncResult.ploomesId);
        console.log('   Legal One ID:', syncResult.legalOneId);
      } else {
        console.log('❌ Erro na sincronização:', syncResult.error);
      }
    } else {
      console.log('⚠️  Legal One não configurado');
      console.log('   Para habilitar: Adicione LEGALONE_API_KEY ao .env');
    }

    // Resumo
    console.log('\n\n📊 Resumo do Teste\n');
    console.log('═'.repeat(60));
    console.log('✅ Contato criado:', contatoId);
    console.log('✅ Oportunidade criada:', dealId);
    console.log('\n💡 Próximos passos:');
    console.log('   1. Acesse seu Ploomes e veja os dados criados');
    console.log('   2. Configure Legal One para sync completo');
    console.log('   3. Execute: npm run stats (ver estatísticas)');
    console.log('   4. Execute: npm start (sync automático)\n');

    // Limpeza (opcional)
    console.log('\n🧹 Deseja limpar os dados de teste? [y/N]');
    console.log('   (Execute manualmente se necessário):');
    console.log(`   - Contato: DELETE /Contacts(${contatoId})`);
    console.log(`   - Oportunidade: DELETE /Deals(${dealId})\n`);

  } catch (error) {
    console.error('\n❌ Erro:', error.message);
    
    if (error.message.includes('Ploomes API error')) {
      console.log('\n💡 Dicas:');
      console.log('   - Verifique se a API key está correta');
      console.log('   - Verifique se tem permissão para criar contatos');
      console.log('   - Veja o erro completo acima para mais detalhes');
    }
    
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  console.log('\n⚡ Iniciando teste de integração...\n');
  
  if (!process.env.PLOOMES_API_KEY) {
    console.error('❌ ERRO: PLOOMES_API_KEY não configurada');
    console.error('Configure no arquivo .env e tente novamente\n');
    process.exit(1);
  }

  exemploUso().catch(error => {
    console.error('Erro fatal:', error);
    process.exit(1);
  });
}

module.exports = { exemploUso };
