import requests
from .models import Gen, Variante

def poblar_variantes():
    gen = Gen.objects.get(nombre='BRCA1')  # Suponiendo que BRCA1 ya está en la tabla Gen

    # Obtener lista de variantes
    url_search = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi"
    params_search = {
        'db': 'clinvar',
        'term': '(BRCA1[Gene Name])',
        'RetMax': 15000,
        'retmode': 'json'
    }
    # url_search = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=clinvar&term=(BRCA1[Gene%20Name])&RetMax=1000&retmode=json"
    response = requests.get(url_search, params=params_search)
    data = response.json()
    console.log(data)
    variant_ids = data.get('esearchresult', {}).get('idlist', [])

    # Iterar sobre los IDs y obtener detalles
    for variant_id in variant_ids:
        url_summary = f"https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi"
        params_summary = {
            'db': 'clinvar',
            'id': variant_id,
            'retmode': 'json'
        }
        response_summary = requests.get(url_summary, params=params_summary)
        data_summary = response_summary.json()

        # Extraer el nombre de la variante
        variant_data = data_summary.get('result', {}).get(variant_id, {})
        nombre_variante = variant_data.get('title', '')

        # Guardar en la base de datos
        if nombre_variante:
            Variante.objects.create(
                gen=gen,
                nombre=nombre_variante,
                secuencia='',  # Aquí podrías añadir más datos si los tienes
                efecto=''
            )
