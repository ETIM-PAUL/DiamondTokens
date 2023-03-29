<script>
  import {
    HeroHeader,
    FeatureDefault,
    FeatureItem,
  } from "flowbite-svelte-blocks";
  import {
    Home,
    PresentationChartLine,
    AcademicCap,
    UserPlus,
    UserGroup,
    Briefcase,
    Wallet,
    CurrencyDollar,
  } from "svelte-heros";
</script>

<div class="mx-20 my-20">
  <HeroHeader
    class="max-w-screen-md mb-8 lg:mb-16"
    h2Class="mb-4 text-4xl tracking-tight font-extrabold text-white-900 dark:text-white"
    pClass="text-gray-500 sm:text-xl dark:text-gray-400"
  >
    <svelte:fragment slot="h2">TransferToken</svelte:fragment>
    <svelte:fragment slot="paragraph"
      >Here at Diamond Labs we focus on building web3 applications that are
      scalable and easy to maintain. This is a simple web3 app that displays the
      basic of ERC tokens and Solidity</svelte:fragment
    >
  </HeroHeader>
  <FeatureDefault>
    <div>
      <FeatureItem>
        <svelte:fragment slot="icon"
          ><CurrencyDollar
            class="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
          /></svelte:fragment
        >
        <svelte:fragment slot="h3">Transfer ERC20 Token</svelte:fragment>
        <svelte:fragment slot="paragraph"
          >Transfer your customized tokens from your balance to any other wallet
          address.</svelte:fragment
        >
      </FeatureItem>
    </div>
    <FeatureItem>
      <svelte:fragment slot="icon"
        ><Briefcase
          class="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
        /></svelte:fragment
      >
      <svelte:fragment slot="h3">Transfer History</svelte:fragment>
      <svelte:fragment slot="paragraph"
        >You can now check all previous transactions.</svelte:fragment
      >
    </FeatureItem>
    <FeatureItem>
      <svelte:fragment slot="icon"
        ><UserPlus
          class="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
        /></svelte:fragment
      >
      <svelte:fragment slot="h3">Approve 3rd Parties</svelte:fragment>
      <svelte:fragment slot="paragraph"
        >This is a feature that allows you to approve other wallet address
        owners to transfer tokens to other people, by allocating them a certain
        amount of tokens to spend.</svelte:fragment
      >
    </FeatureItem>
    <FeatureItem>
      <svelte:fragment slot="icon"
        ><UserGroup
          class="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
        /></svelte:fragment
      >
      <svelte:fragment slot="h3">List of 3rd Parties</svelte:fragment>
      <svelte:fragment slot="paragraph"
        >From Here, you can see all representatives that was assigned to carry
        out transfers on your behalf.</svelte:fragment
      >
    </FeatureItem>
  </FeatureDefault>
</div>
