# Premium Features

Vanguard **is based on a [freemium](https://en.wikipedia.org/wiki/Freemium) model**, offering essential features for free, while **restricting access to more advanced features as premium features**.

Thanks to these premium features, **we can ensure that Vanguard works properly** in **all Discord communities**.

All premium features **will be marked with a small badge next to their corresponding header**.

## Configuring Premium Features

Users **can configure the premium features** listed in the documentation.

However, **these premium features will be ignored during execution** if the community **does not have a Vanguard premium membership**.

:::tip Case Study: Configuring Nicknames
If **a premium feature allows a user to change their nickname**, users **will be able to configure that feature**.

```yaml
config:
    # This feature is designated as premium,
    # but Vanguard will allow its settings to be saved.

    # The nickname format will be: [Member] Vanguard
    member_nickname: "[Member] {{ member.display_name }}""
```

When the system starts running, Vanguard **will check whether the community has a premium membership**.

If the community **has a premium membership**, Vanguard **will modify the user’s nickname** to the specified format. Otherwise, Vanguard **will ignore this feature**.
:::
