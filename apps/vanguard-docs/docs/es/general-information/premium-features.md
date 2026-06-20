# Funcionalidades Premium

Vanguard **está basado en un modelo [freemium](https://es.wikipedia.org/wiki/Freemium)**, ofreciendo funcionalidades esenciales gratuitas, mientras **limitamos otras funcionalidades más avanzadas como premium**.

Gracias a estas funcionalidades premium, **podemos garantizar el correcto funcionamiento de Vanguard** en **todas las comunidades de Discord**.

Todas las funcionalidades premium **se indicarán con una pequeña insignia al lado de su encabezado correspondiente**.

## Configuración de Funcionalidades Premium

Los usuarios **podrán configurar las funcionalidades premium** que se indican en la documentación.

Sin embargo, **estas funcionalidades premium serán ignoradas en la ejecución** en caso de que la comunidad **no posea una membresía premium de Vanguard**.

:::tip Caso Práctico: Configurar Apodos
En caso de que **una funcionalidad premium permita modificar el apodo de un usuario**, los usuarios **podrán configurar dicha funcionalidad**.

```yaml
config:
	# Esta funcionalidad está declarada como premium,
	# pero Vanguard permitirá guardar su configuración.

	# El formato del apodo será: [Member] Vanguard
	member_nickname: "[Member] {{ member.display_name }}"
```

Cuando el sistema empiece a ser ejecutado, Vanguard **comprobará si la comunidad posee una membresía premium**.

En caso de que la comunidad **posea una membresía premium**, Vanguard **modificará el apodo del usuario** al formato indicado. En caso contrario, Vanguard **ignorará dicha funcionalidad**.
:::
