import '../../main.css'
import 'w3-css/4/w3pro.css'
import { useOrderAPI, useSliderModal } from '../../hooks'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import app from "../../base";


export function MainList({ list }) {
    const [selectedItems, setSelectedItems] = useState([]);
    const [totalValue, setTotalValue] = useState(0);

    useEffect(() => {
        let totalValueNew = 0;
        selectedItems.forEach(({ value }) => {
            totalValueNew = totalValueNew + value;
        });
        console.log('totalValueNew', totalValueNew);
        setTotalValue(totalValueNew);
    }, [selectedItems]);

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
                                const hasProductAddedIndex = selectedItems.findIndex(({ name }) => name === v.name);
                                return (
                                    <div id="products">
                                        <b class="product-name">{v.name}</b>
                                        <h1 class="w3-right w3-tag w3-dark-grey w3-round">{new Intl.NumberFormat('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL'
                                        }).format(v.value)}</h1>
                                        <p class="w3-text-grey description">{v.description}</p>
                                        <button class="buy-button-circle" onClick={() => {
                                            setSelectedItems([...selectedItems, { name: v.name, value: v.value, description: v.description }]);
                                        }}>+</button>
                                        <button class={hasProductAddedIndex !== -1 ? "buy-button-circle" : "buy-button-circle-disabled"} onClick={() => {
                                            const indexToRemove = selectedItems.findIndex(({ name }) => name === v.name);
                                            if (indexToRemove !== -1) {
                                                let newItems = selectedItems;
                                                newItems.splice(indexToRemove, 1);
                                                setSelectedItems([...newItems]);
                                            }
                                        }}>-</button>
                                        <hr />
                                    </div>
                                )
                            })}
                            <FinishOrderConteiner selectedItems={selectedItems} totalValue={totalValue} />
                        </div>
                    </div>
                </div>
            </div>

            <LocationArea />

            <Footer />
        </body>
    );
}

function FinishOrderForm({ products, totalValue }) {
    const { postOrder } = useOrderAPI()
    const { hideSliderModal } = useSliderModal()
    const [request, setRequest] = useState({
        name: "",
        total: totalValue,
        tel: "",
        address: ""
    })
    const [validated, setValidated] = useState(false)

    async function postProductsOrder() {
        const result = await postOrder(
            request.name,
            request.total,
            request.tel,
            request.address
        )
        console.log(result)
    }

    async function handleSubmit(event) {
        event.preventDefault()
        event.stopPropagation()

        const form = event.currentTarget

        if (form.checkValidity()) {
            await postProductsOrder()
            hideSliderModal()
        }

        setValidated(true)
    }

    function handleChangeName(e) {
        setRequest({ ...request, name: e.target.value })
    }

    function handleChangeAddress(e) {
        setRequest({ ...request, address: e.target.value })
    }

    function handleChangePhone(e) {
        setRequest({ ...request, tel: e.target.value })
    }

    return (
        <div className="modal">
            <h1>Total do pedido: {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(totalValue)}</h1>

            {products.map((v, key) => {
                return (
                    <div id="products">
                        <b style={{ fontSize: 28 }}>{v.name}</b>
                        <h3 class="w3-right w3-tag w3-dark-grey w3-round">{new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(v.value)}</h3>
                        <p style={{ fontSize: 24 }} class="w3-text-grey">{v.description}</p>
                    </div>
                )
            })}

            <h1><b>Digite seus dados para finalizar o pedido:</b></h1>

            <Form
                noValidate
                validated={validated}
                className="modal-form"
                onSubmit={handleSubmit}
            >
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Nome"
                        className="form-input"
                        onChange={handleChangeName}
                        required
                    />
                </Form.Group>

                <Form.Group >
                    <Form.Control
                        type="text"
                        className="form-input"
                        placeholder="Endereço"
                        onChange={handleChangeAddress}
                    />
                </Form.Group>

                <Form.Group >
                    <Form.Control
                        type="text"
                        placeholder="Telefone"
                        className="form-input"
                        onChange={handleChangePhone}
                        required
                    />
                </Form.Group>

                <Button className="finish-button" variant="primary" type="submit">
                    finalizar
        </Button>
            </Form>
        </div>
    )
}

function FinishOrderConteiner({ selectedItems, totalValue }) {
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