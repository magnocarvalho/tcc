let chai = require('chai');
let chaiHttp = require('chai-http');
var should = chai.should();

chai.use(chaiHttp);

// Nossa suite de teste relacionada a pagar
describe('pagar', () => {
    describe('/POST', () => {
        it('Verificar o pagamento 1', (done) => {
            let pagar = { // Vamos definir o pagamento que vamos inserir
                "pagador": "5d1428c1ccc3682c880a67c2",
                "recebedor": "5d1428c1ccc3682c880a67c8",
                "valor": "10",
                "parcelas": "1"
            }
            chai.request('http://localhost:1337')
                .post('/pagar')
                .send(pagar) // vamos enviar esse arquivo
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

    });
    describe('/POST', () => {
        it('Verificar o pagamento 2', (done) => {
            let pagar = { // Vamos definir o pagamento que vamos inserir
                "pagador": "5d1428c1ccc3682c880a67c2",
                "recebedor": "5d1428c1ccc3682c880a67c8",
                "valor": "20",
                "parcelas": "2"
            }
            chai.request('http://localhost:1337')
                .post('/pagar')
                .send(pagar) // vamos enviar esse arquivo
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

    });
    describe('/POST', () => {
        it('Verificar o pagamento 3', (done) => {
            let pagar = { // Vamos definir o pagamento que vamos inserir
                "pagador": "5d1428c1ccc3682c880a67c2",
                "recebedor": "5d1428c1ccc3682c880a67c8",
                "valor": "30",
                "parcelas": "3"
            }
            chai.request('http://localhost:1337')
                .post('/pagar')
                .send(pagar) // vamos enviar esse arquivo
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

    });
})