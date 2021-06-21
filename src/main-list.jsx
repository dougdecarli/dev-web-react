import './main.css'
import 'w3-css/4/w3pro.css'
import { useProductsAPI, useSliderModal } from './hooks'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useState, useEffect } from 'react'
import { render } from 'react-dom'
import app from "./base";

export function MainList({ list, updateList }) {
    const [selectedItems, setSelectedItems] = useState([]);
    const [totalValue, setTotalValue] = useState(0);

    useEffect(() => {
        let totalValueNew = 0;
        selectedItems.forEach(({ value }) => {
            totalValueNew = totalValueNew + value;
        });
        setTotalValue(totalValueNew);
    }, [selectedItems]);

    function LoadProductList({ updateList, name, description, value, onPressPlus }) {
        return (
            <div id="products">
                <b class="product-name">{name}</b>
                <h1 class="w3-right w3-tag w3-dark-grey w3-round">R${value}</h1>
                <p class="w3-text-grey description">{description}</p>
                <button class="buy-button-circle" onClick={() => {
                    const alreadySelected = selectedItems;
                    alreadySelected.push({ name, value, description });
                    setSelectedItems(alreadySelected);
                }}>+</button>
                <button class="buy-button-circle-disabled">-</button>
            </div>
        )
    }

    const FinishOrderConteiner = () => {
        console.log('new items', selectedItems)
    const { showSliderModal } = useSliderModal()

    function openFinishOrderForm() {
        showSliderModal({
            content: (
                <FinishOrderForm
                    products={selectedItems}
                    totalValue={totalValue}
                />
            )
        })
    }

        return (
            <a id="finish_order" onClick={openFinishOrderForm}>
                <div class="finish-request-container">
                    <div class="finish-request-content">
                        <p class="total-value" id="total_value">Valor total: {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(totalValue)}</p>
                    </div>
                    <div class="finish-request-content">
                        <p class="total-value">Finalizar pedido</p>
                    </div>
                </div>
            </a>)
    }

    return (
        <body>
            <Menu />
            <Header />

            <div class="div-pedido-container">
                <div class="w3-container" id="pedido">
                    <div class="w3-content">
                        <h5 class="w3-center padding-64"><span class="tag font-wide">FAÇA SEU PEDIDO</span></h5>
                        <div id="pedido" class="w3-container color-white padding-32">

                            {list.map((v, key) => {
                                return (
                                    <LoadProductList
                                        key={key}
                                        updateList={updateList}
                                        name={v.name}
                                        description={v.description}
                                        value={v.value}
                                        onPressPlus={(product) => {
                                            const alreadySelected = selectedItems;
                                            alreadySelected.push(product);
                                            console.log('presplus already b', alreadySelected);
                                            setSelectedItems(alreadySelected);
                                        }}
                                    />
                                )
                            })}
                            <a id="finish_order" onClick={openFinishOrderForm}>
                                <div class="finish-request-container">
                                    <div class="finish-request-content">
                                        <p class="total-value" id="total_value">Valor total: {new Intl.NumberFormat('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL'
                                        }).format(totalValue)}</p>
                                    </div>
                                    <div class="finish-request-content">
                                        <p class="total-value">Finalizar pedido</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <LocationArea />

            <Footer />
        </body>
    );
}

function FinishOrderForm({ totalValue }) {
    const [request, setRequest] = useState({

    })
    const [validated, setValidated] = useState(false)

    async function handleSubmit(event) {
        setValidated(true)
    }

    function handleChangeName(e) {

    }

    function handleChangeAddress(e) {

    }

    function handleChangePhone(e) {

    }

    return (
        <div className="modal">
            <h2>Editar transação</h2>

            <h2>Total: {totalValue}</h2>

            <Form
                noValidate
                validated={validated}
                className="modal-form"
                onSubmit={handleSubmit}
            >
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Valor"
                        // value={cashMovement.valor}
                        // onChange={handleChangeValor}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor informe o valor.
          </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Detalhe"
                    // value={cashMovement.detalhe}
                    // onChange={handleChangeDetalhe}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        type="date"
                        defaultValue="2021-04-27"
                        // value={cashMovement.dataPrevista}
                        // onChange={handleChangeData}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor informe a data.
          </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        as="select"
                        // value={cashMovement.tipo}
                        // onChange={handleChangeTipo}
                        required
                    >
                        <option value="" selected disabled hidden>
                            Tipo
            </option>
                        <option value="despesa">Despesa</option>
                        <option value="receita">Receita</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Por favor selecione um tipo.
          </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Descrição"
                        // value={cashMovement.descricao}
                        // onChange={handleChangeDescricao}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor informe a descrição.
          </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Enviar
        </Button>
            </Form>
        </div>
    )
}

function LocationArea() {
    return (
        <div id="localizacao" class="container-map">
            <h1 class="location-label">Nossa localização</h1>
            <iframe
                title="Localizacao"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3464.7094388412597!2d-51.141705284892254!3d-29.72817478199845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95194287a369e021%3A0xda0e5e2fbbb50ac7!2sAv.%20Pedro%20Adams%20Filho%2C%203%20-%20Centro%2C%20Novo%20Hamburgo%20-%20RS!5e0!3m2!1spt-BR!2sbr!4v1603995264754!5m2!1spt-BR!2sbr"
                width="100%" height="800" frameborder="0" style={{ border: 0 }} allowfullscreen="" aria-hidden="false"
                tabindex="0">
            </iframe>
        </div>
    )
}

function Footer() {
    return (<footer id="sobre-nos" class="w3-center ligth-gray padding-48 font-footer">
        <p>Augusto Ferreira & Douglas de Carli</p>
    </footer>)
}

function Header() {
    return (
        <header class="bgimg container-relative grayscale-min" id="home">
            <div class="bottom-left aligin-center large-padding ">
                <span class="tag tag-font">Aberto das 18h as 23:59h</span>
            </div>
            <div class="display-middle aligin-center">
                <span class="text-white">Hamburgueria do Guto</span>
            </div>
        </header>
    )
}

function Menu() {
    return (
        <div class="top">
            <div class="w3-row simple-padding color-back">
                <div class="w3-col s3 align-center">
                    <a class="menu-links w3-button block color-back" href="#.">HOME</a>
                </div>
                <div class="w3-col s3 align-center">
                    <a class="menu-links w3-button block color-back" href="#pedido">PEDIDO</a>
                </div>
                <div class="w3-col s3 align-center">
                    <a class="menu-links w3-button block color-back" href="#localizacao">LOCALIZAÇÃO</a>
                </div>
                <div class="w3-col s3 align-center">
                    <a class="menu-links w3-button block color-back" onClick={() => app.auth().signOut()}>SAIR</a>
                </div>
            </div>
        </div>
    )
}