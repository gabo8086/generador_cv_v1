import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
// ↑ NUEVO: ActivityIndicator — es el spinner de carga (el circulito girando)

export default function Index() {
    const [nombre, setNombre] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [puesto, setPuesto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [cargando, setCargando] = useState(false);
    // ↑ NUEVO: igual que en la versión web
    const [textoMejorado, setTextoMejorado] = useState('');
    // ↑ NUEVO: guarda el texto profesional
    const [cvGenerado, setCvGenerado] = useState(false);
    // ↑ NUEVO: controla qué pantalla se muestra

    const generarCV = async () => {
        if (!nombre || !descripcion) {
            alert('Por favor llena al menos tu nombre y descripción');
            return;
            // ↑ NUEVO: validación básica
            // Si el usuario no llenó los campos importantes, no continúa
            // "return" corta la función aquí — no ejecuta lo de abajo
        }

        setCargando(true);

        await new Promise(resolve => setTimeout(resolve, 2000));
        // ↑ Simula 2 segundos de espera (después será la API real)

        setTextoMejorado(
            `Profesional con experiencia como ${puesto} en ${empresa}. ` +
            `Responsable de ${descripcion.toLowerCase()}. ` +
            `Demostrada capacidad para gestionar responsabilidades de manera ` +
            `eficiente, con orientación al detalle y compromiso con la excelencia operativa.`
        );

        setCargando(false);
        setCvGenerado(true);
    };

    // ↓ NUEVO: función para volver al formulario
    const volverAEditar = () => {
        setCvGenerado(false);
    };

    // ↓ PANTALLA DEL FORMULARIO
    if (!cvGenerado) {
        // ↑ CAMBIO: usamos if/return en vez de {!cvGenerado && (...)}
        // En React Native es más limpio separar las pantallas así
        // Funciona igual — si cvGenerado es false, muestra el formulario
        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
                <View style={{ padding: 20, paddingTop: 60 }}>

                    <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#6c5ce7', marginBottom: 4 }}>
                        Generador de CV
                    </Text>
                    <Text style={{ color: '#888', marginBottom: 24, fontSize: 14 }}>
                        Llena tus datos y la IA hará el resto
                    </Text>
                    {/* ↑ NUEVO: subtítulo para darle contexto al usuario */}

                    <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Nombre completo</Text>
                    <TextInput
                        value={nombre}
                        onChangeText={setNombre}
                        placeholder="Ej: Juan Pérez"
                        style={{
                            backgroundColor: 'white',
                            padding: 12,
                            borderRadius: 8,
                            borderWidth: 1,
                            borderColor: '#ddd',
                            marginBottom: 16,
                            fontSize: 14
                        }}
                    />

                    <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Empresa</Text>
                    <TextInput
                        value={empresa}
                        onChangeText={setEmpresa}
                        placeholder="Ej: Tienda Don Carlos"
                        style={{
                            backgroundColor: 'white',
                            padding: 12,
                            borderRadius: 8,
                            borderWidth: 1,
                            borderColor: '#ddd',
                            marginBottom: 16,
                            fontSize: 14
                        }}
                    />

                    <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Puesto</Text>
                    <TextInput
                        value={puesto}
                        onChangeText={setPuesto}
                        placeholder="Ej: Vendedor"
                        style={{
                            backgroundColor: 'white',
                            padding: 12,
                            borderRadius: 8,
                            borderWidth: 1,
                            borderColor: '#ddd',
                            marginBottom: 16,
                            fontSize: 14
                        }}
                    />

                    <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>¿Qué hacías? (en tus palabras)</Text>
                    <TextInput
                        value={descripcion}
                        onChangeText={setDescripcion}
                        placeholder="Ej: Atendía clientes, cobraba y acomodaba producto"
                        multiline={true}
                        numberOfLines={3}
                        style={{
                            backgroundColor: 'white',
                            padding: 12,
                            borderRadius: 8,
                            borderWidth: 1,
                            borderColor: '#ddd',
                            marginBottom: 20,
                            fontSize: 14,
                            textAlignVertical: 'top'
                        }}
                    />

                    <TouchableOpacity
                        onPress={generarCV}
                        disabled={cargando}
                        // ↑ disabled funciona igual que en web
                        style={{
                            backgroundColor: cargando ? '#a29bfe' : '#6c5ce7',
                            padding: 16,
                            borderRadius: 8,
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            gap: 10
                            // ↑ NUEVO: flexDirection 'row' + gap
                            // Pone el spinner y el texto en fila con espacio entre ellos
                        }}
                    >
                        {cargando && <ActivityIndicator color="white" />}
                        {/* ↑ NUEVO: spinner que solo aparece cuando está cargando */}
                        {/* ActivityIndicator es el componente nativo de Android/iOS para carga */}
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                            {cargando ? 'Generando tu CV...' : '✨ Generar CV con IA'}
                        </Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        );
    }

    // ↓ PANTALLA DEL CV GENERADO
    // Si llegamos aquí es porque cvGenerado es true
    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
            <View style={{ padding: 20, paddingTop: 60 }}>

                <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#6c5ce7', marginBottom: 20 }}>
                    ✨ Tu CV generado
                </Text>

                {/* ↓ Tarjeta del CV */}
                <View style={{
                    backgroundColor: 'white',
                    padding: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: '#6c5ce7'
                }}>
                    {/* Encabezado */}
                    <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 4 }}>
                        {nombre}
                    </Text>
                    <View style={{
                        height: 3,
                        backgroundColor: '#6c5ce7',
                        marginBottom: 20,
                        borderRadius: 2
                    }} />
                    {/* ↑ NUEVO: línea decorativa debajo del nombre */}
                    {/* En React Native no existe <hr>, se hace con un View con altura fija */}

                    {/* Sección experiencia */}
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#6c5ce7', marginBottom: 8 }}>
                        Experiencia Laboral
                    </Text>
                    <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>
                        {puesto} — {empresa}
                    </Text>
                    <Text style={{ color: '#555', lineHeight: 22 }}>
                        {textoMejorado}
                    </Text>

                    {/* Texto original */}
                    <View style={{
                        marginTop: 20,
                        padding: 12,
                        backgroundColor: '#f0f0f0',
                        borderRadius: 8
                    }}>
                        <Text style={{ fontSize: 11, color: '#999', marginBottom: 4 }}>
                            Tu texto original:
                        </Text>
                        <Text style={{ fontSize: 12, color: '#777', fontStyle: 'italic' }}>
                            "{descripcion}"
                        </Text>
                    </View>
                </View>

                {/* ↓ Botones de acción */}
                <View style={{
                    flexDirection: 'row',
                    gap: 10,
                    marginTop: 20
                }}>
                    {/* ↑ flexDirection: 'row' pone los botones en fila */}
                    {/* En React Native todo es columna por defecto (uno debajo de otro) */}
                    {/* En web el default es fila — esta es una diferencia importante */}

                    <TouchableOpacity
                        onPress={volverAEditar}
                        style={{
                            flex: 1,
                            padding: 14,
                            borderRadius: 8,
                            borderWidth: 2,
                            borderColor: '#6c5ce7',
                            alignItems: 'center'
                        }}
                    >
                        <Text style={{ color: '#6c5ce7', fontWeight: 'bold' }}>
                            ← Editar
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => alert('Aquí irá la descarga del PDF')}
                        style={{
                            flex: 1,
                            padding: 14,
                            borderRadius: 8,
                            backgroundColor: '#00b894',
                            alignItems: 'center'
                        }}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>
                            📄 Descargar PDF
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>
    );
}